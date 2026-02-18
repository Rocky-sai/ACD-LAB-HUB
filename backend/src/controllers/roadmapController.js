import Roadmap from '../models/Roadmap.js';

export const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().sort({ year: 1 });
    res.json(roadmaps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRoadmapByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const roadmap = await Roadmap.findOne({ year: parseInt(year) });
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createRoadmap = async (req, res) => {
  try {
    const roadmap = new Roadmap(req.body);
    await roadmap.save();
    res.status(201).json(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const roadmap = await Roadmap.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const roadmap = await Roadmap.findByIdAndDelete(id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
