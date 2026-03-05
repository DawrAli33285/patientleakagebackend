const adminModel = require("../admin");
const jwt = require('jsonwebtoken');
const usermodel = require("../user");
const filemodel = require("../footdata").default;


module.exports.adminLogin = async (req, res) => {
  let { ...data } = req.body;
  try {
    if (!data.email || !data.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    let adminFound = await adminModel.findOne({ email: data.email });
    if (!adminFound) {
      return res.status(400).json({ error: "Admin not found" });
    }
    if (adminFound.password !== data.password) {
      return res.status(400).json({ error: "Invalid password" });
    }
    adminFound = adminFound.toObject();
    const { password, ...adminWithoutPassword } = adminFound;
    let token = await jwt.sign(adminWithoutPassword, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log(`Admin login successful for: ${data.email} at ${new Date().toISOString()}`);
    return res.status(200).json({ admin: adminWithoutPassword, token });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Error occurred while trying to login" });
  }
};


module.exports.adminRegister = async (req, res) => {
  let { ...data } = req.body;
  try {
    if (!data.email || !data.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    let alreadyExists = await adminModel.findOne({ email: data.email });
    if (alreadyExists) {
      return res.status(400).json({ error: "Admin already exists" });
    }
    let admin = await adminModel.create(data);
    admin = admin.toObject();
    const { password, ...adminWithoutPassword } = admin;
    let token = await jwt.sign(adminWithoutPassword, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ admin: adminWithoutPassword, token });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Error occurred while trying to register" });
  }
};


module.exports.resetPassword = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    let adminFound = await adminModel.findOne({ email });
    if (!adminFound) {
      return res.status(400).json({ error: "Admin not found" });
    }
    await adminModel.updateOne({ email }, { $set: { password } });
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: "Error occurred while trying to reset password", details: e.message });
  }
};


module.exports.getUsers = async (req, res) => {
  try {
    let users = await usermodel.find({});
    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Error occured while trying to fetch users" });
  }
};


module.exports.updateUser = async (req, res) => {
  const { ...data } = req.body;
  const { id } = req.params;
  try {
    const found = await usermodel.findOne({ $expr: { $eq: [{ $toString: "$_id" }, id] } });
    console.log("FOUND:", found);
    let updated = await usermodel.updateOne(
      { $expr: { $eq: [{ $toString: "$_id" }, id] } },
      { $set: data }
    );
    console.log(updated);
    return res.status(200).json({ message: "User updated sucessfully" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Error occured while trying to update user" });
  }
};


module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await usermodel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted sucessfully" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Error occured while trying to delete user" });
  }
};


// ── File (FootData) operations ────────────────────────────────────────────────

module.exports.deleteFile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await filemodel.deleteOne({ _id: id });
    return res.status(200).json({ message: "File deleted sucessfully" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Error occured while trying to delete file" });
  }
};


module.exports.updateFile = async (req, res) => {
  const { ...data } = req.body;
  const { id } = req.params;
  try {
    await filemodel.findByIdAndUpdate(id, { $set: data });
    return res.status(200).json({ message: "File updated sucessfully" });
  } catch (e) {
    return res.status(400).json({ error: "Error occured while trying to update file" });
  }
};


module.exports.getFiles = async (req, res) => {
  try {
    // Populate user to get email; select only needed fields
    let files = await filemodel.find({}).populate('user', 'email');
    return res.status(200).json({ files });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Error occured while trying to fetch files" });
  }
};


module.exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // ── User stats ────────────────────────────────────────────────
    const totalUsers = await usermodel.countDocuments();
    const usersLastMonth = await usermodel.countDocuments({
      createdAt: { $lt: firstDayOfCurrentMonth }
    });
    const usersThisMonth = totalUsers - usersLastMonth;
    const userGrowthPercentage = usersLastMonth > 0
      ? Math.round((usersThisMonth / usersLastMonth) * 100)
      : 0;

    // ── Active users (based on FootData created_at) ───────────────
    // Users who uploaded foot data in the last 30 days
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo  = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const activeUserFiles = await filemodel.find({
      created_at: { $gte: thirtyDaysAgo }
    }).distinct('user');
    const activeUsers = activeUserFiles.length;

    const previousActiveUserFiles = await filemodel.find({
      created_at: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    }).distinct('user');
    const previousActiveUsers = previousActiveUserFiles.length;
    const activeUserGrowthPercentage = previousActiveUsers > 0
      ? Math.round(((activeUsers - previousActiveUsers) / previousActiveUsers) * 100)
      : 0;

    // ── File (FootData) stats ─────────────────────────────────────
    const totalFiles = await filemodel.countDocuments();
    const filesLastMonth = await filemodel.countDocuments({
      created_at: { $lt: firstDayOfCurrentMonth }
    });
    const filesThisMonth = totalFiles - filesLastMonth;
    const fileGrowthPercentage = filesLastMonth > 0
      ? Math.round((filesThisMonth / filesLastMonth) * 100)
      : 0;

    // ── Storage: estimate based on secondary_matches array size ───
    // Use average visitor count as a rough size proxy (KB)
    const allFiles = await filemodel.find({}, 'primary_visitor_count secondary_matches');
    const totalStorageKB = allFiles.reduce((acc, f) => {
      const matchCount = f.secondary_matches?.length || 0;
      return acc + 2.5 + matchCount * 0.5; // base 2.5KB + 0.5KB per match
    }, 0);
    const storageUsed = (totalStorageKB / 1024).toFixed(2); // convert to MB

    // ── Monthly growth (last 6 months, using created_at) ─────────
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = [];

    for (let i = 5; i >= 0; i--) {
      const monthDate     = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonthDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const usersInMonth = await usermodel.countDocuments({
        createdAt: { $gte: monthDate, $lt: nextMonthDate }
      });

      // FootData uses created_at (not createdAt)
      const filesInMonth = await filemodel.countDocuments({
        created_at: { $gte: monthDate, $lt: nextMonthDate }
      });

      monthlyData.push({
        month: monthNames[monthDate.getMonth()],
        users: usersInMonth,
        files: filesInMonth
      });
    }

    // ── Recent activity ───────────────────────────────────────────
    const recentFiles = await filemodel.find()
      .populate('user', 'email')
      .sort({ created_at: -1 })   // ← was createdAt
      .limit(10);

    const recentUsers = await usermodel.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = [];

    recentFiles.forEach(file => {
      activities.push({
        email:  file.user?.email || 'Unknown user',
        action: `Uploaded data for ${file.primary_location}`,
        time:   file.created_at,   // ← was createdAt
        type:   'file'
      });
    });

    recentUsers.forEach(user => {
      activities.push({
        email:  user.email,
        action: 'Registered',
        time:   user.createdAt,
        type:   'user'
      });
    });

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const recentActivity = activities.slice(0, 10).map(a => ({
      email:  a.email,
      action: a.action,
      time:   a.time
    }));

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers:  { count: totalUsers,  growth: userGrowthPercentage },
        activeUsers: { count: activeUsers, growth: activeUserGrowthPercentage },
        totalFiles:  { count: totalFiles,  growth: fileGrowthPercentage },
        storageUsed: { size: storageUsed,  growth: 0 }
      },
      monthlyGrowth:  monthlyData,
      recentActivity: recentActivity
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};