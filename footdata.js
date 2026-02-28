import mongoose from 'mongoose';

const footDataSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  primary_location: {
    type: String,
    required: true
  },
  primary_address: {
    type: String
  },
  primary_visitor_count: {
    type: Number,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  },
  secondary_matches: [
    {
      location: String,
      address: String,
      matched_maid_count: Number,
      matched_maids: [String]
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const FootDataModel = mongoose.model('FootData', footDataSchema);
export default FootDataModel;