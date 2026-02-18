import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { progressAPI } from '../services/api';
import { Calendar, CheckCircle, Circle, Save } from 'lucide-react';

const WeeklyPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState('Week 1');
  const [tasks, setTasks] = useState([
    { name: 'Learn', completed: false },
    { name: 'Practice', completed: false },
    { name: 'Project', completed: false },
    { name: 'Revision', completed: false },
    { name: 'Weekly Test', completed: false },
  ]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadWeeklyPlanner();
  }, []);

  const loadWeeklyPlanner = async () => {
    try {
      const response = await progressAPI.getProgress();
      const weeklyPlanner = response.data.weeklyPlanner || [];
      if (weeklyPlanner.length > 0) {
        const latest = weeklyPlanner[weeklyPlanner.length - 1];
        setCurrentWeek(latest.week);
        setTasks(latest.tasks);
      }
    } catch (error) {
      console.error('Error loading weekly planner:', error);
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await progressAPI.updateWeeklyPlanner({ week: currentWeek, tasks });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving weekly planner:', error);
    } finally {
      setSaving(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">
              <Calendar className="inline mr-3 text-purple-600" size={40} />
              <span className="text-gradient">Weekly Study Planner</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Organize your weekly study schedule and track your progress
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Week</label>
            <select
              value={currentWeek}
              onChange={(e) => setCurrentWeek(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-600"
            >
              {Array.from({ length: 52 }, (_, i) => (
                <option key={i} value={`Week ${i + 1}`}>
                  Week {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">Weekly Progress</h3>
              <span className="text-sm font-semibold text-purple-600">
                {completedCount} / {tasks.length} tasks
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  task.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                }`}
                onClick={() => toggleTask(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {task.completed ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <Circle className="text-gray-400" size={24} />
                    )}
                    <span
                      className={`text-lg font-medium ${
                        task.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {task.name}
                    </span>
                  </div>
                  {task.completed && (
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ✓ Done
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              <Save className="inline mr-2" size={20} />
              {saving ? 'Saving...' : 'Save Progress'}
            </button>
            {saved && (
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ✓ Saved!
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        >
          <h3 className="text-xl font-bold mb-3">💡 Study Tips</h3>
          <ul className="space-y-2 text-purple-100">
            <li>• Dedicate 3-4 hours daily to your quantum computing studies</li>
            <li>• Balance theory with hands-on practice and projects</li>
            <li>• Take regular breaks to avoid burnout</li>
            <li>• Review and revise completed topics regularly</li>
            <li>• Test your knowledge weekly to track improvement</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;
