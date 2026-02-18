import User from '../models/User.js';

export const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('progress completedTopics weeklyPlanner');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { topicId, year } = req.body;
    
    const user = await User.findById(req.userId);
    
    // Check if topic already completed
    const alreadyCompleted = user.completedTopics.some(
      topic => topic.topicId === topicId
    );
    
    if (!alreadyCompleted) {
      user.completedTopics.push({
        topicId,
        completedAt: new Date()
      });
      
      // Update year progress
      if (year === 1) {
        user.progress.year1.completed += 1;
      } else if (year === 2) {
        user.progress.year2.completed += 1;
      } else if (year === 3) {
        user.progress.year3.completed += 1;
      }
      
      await user.save();
    }
    
    res.json({
      message: 'Progress updated successfully',
      progress: user.progress,
      completedTopics: user.completedTopics
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateWeeklyPlanner = async (req, res) => {
  try {
    const { week, tasks } = req.body;
    
    const user = await User.findById(req.userId);
    
    const existingWeek = user.weeklyPlanner.find(w => w.week === week);
    
    if (existingWeek) {
      existingWeek.tasks = tasks;
    } else {
      user.weeklyPlanner.push({ week, tasks });
    }
    
    await user.save();
    
    res.json({
      message: 'Weekly planner updated successfully',
      weeklyPlanner: user.weeklyPlanner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const generateCertificate = async (req, res) => {
  try {
    const { year } = req.body;
    const user = await User.findById(req.userId);
    
    // Generate unique certificate ID
    const certificateId = `QV-${year}-${user._id.toString().slice(-6)}-${Date.now()}`;
    
    user.certificates.push({
      certificateId,
      generatedAt: new Date(),
      year
    });
    
    await user.save();
    
    res.json({
      message: 'Certificate generated successfully',
      certificate: {
        certificateId,
        name: user.name,
        year,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
