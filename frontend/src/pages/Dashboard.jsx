import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';
import { TrendingUp, Award, Calendar, BookOpen, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const response = await progressAPI.getProgress();
      setProgress(response.data);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const totalCompleted = progress?.completedTopics?.length || 0;
  const totalTopics = 12; // 4 topics per year * 3 years
  const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

  const year1Progress = progress?.progress?.year1
    ? Math.round((progress.progress.year1.completed / progress.progress.year1.total) * 100)
    : 0;
  const year2Progress = progress?.progress?.year2
    ? Math.round((progress.progress.year2.completed / progress.progress.year2.total) * 100)
    : 0;
  const year3Progress = progress?.progress?.year3
    ? Math.round((progress.progress.year3.completed / progress.progress.year3.total) * 100)
    : 0;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient">{user?.name}</span>! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Continue your quantum computing journey
          </p>
        </motion.div>

        {/* Overall Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-indigo-100">
                {totalCompleted} of {totalTopics} topics completed
              </p>
            </div>
            <TrendingUp size={48} className="opacity-80" />
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 mb-2">
            <div
              className="bg-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <p className="text-right text-indigo-100 font-semibold">{overallProgress}%</p>
        </motion.div>

        {/* Year Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Year 1 — Foundations
            </h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${year1Progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {progress?.progress?.year1?.completed || 0} / {progress?.progress?.year1?.total || 4} completed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card border-l-4 border-green-500"
          >
            <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
              Year 2 — Development
            </h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${year2Progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {progress?.progress?.year2?.completed || 0} / {progress?.progress?.year2?.total || 4} completed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card border-l-4 border-orange-500"
          >
            <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">
              Year 3 — Industry
            </h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${year3Progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {progress?.progress?.year3?.completed || 0} / {progress?.progress?.year3?.total || 4} completed
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/roadmap">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="card text-center hover:shadow-xl cursor-pointer"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-bold mb-1">View Roadmap</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore the full 3-year curriculum
              </p>
            </motion.div>
          </Link>

          <Link to="/planner">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="card text-center hover:shadow-xl cursor-pointer"
            >
              <Calendar className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-bold mb-1">Weekly Planner</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Plan your weekly study schedule
              </p>
            </motion.div>
          </Link>

          <Link to="/certificates">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="card text-center hover:shadow-xl cursor-pointer"
            >
              <Award className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-bold mb-1">Certificates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View and generate certificates
              </p>
            </motion.div>
          </Link>

          <Link to="/roadmap/1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="card text-center hover:shadow-xl cursor-pointer bg-gradient-to-br from-purple-600 to-pink-600 text-white"
            >
              <ArrowRight className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold mb-1">Resume Learning</h3>
              <p className="text-sm text-purple-100">
                Continue where you left off
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
