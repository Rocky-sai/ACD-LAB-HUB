import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  progress: {
    year1: {
      completed: { type: Number, default: 0 },
      total: { type: Number, default: 4 }
    },
    year2: {
      completed: { type: Number, default: 0 },
      total: { type: Number, default: 4 }
    },
    year3: {
      completed: { type: Number, default: 0 },
      total: { type: Number, default: 4 }
    }
  },
  completedTopics: [{
    topicId: String,
    completedAt: Date
  }],
  weeklyPlanner: [{
    week: String,
    tasks: [{
      name: String,
      completed: Boolean
    }]
  }],
  certificates: [{
    certificateId: String,
    generatedAt: Date,
    year: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);
