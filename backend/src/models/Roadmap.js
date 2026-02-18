import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  topics: [{
    id: String,
    title: String,
    duration: String,
    description: String,
    resources: [{
      title: String,
      url: String,
      type: String
    }],
    projects: [String],
    order: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Roadmap', roadmapSchema);
