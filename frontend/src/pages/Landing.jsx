import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Award, BookOpen, Rocket, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              🌌 The Complete 3-Year
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Quantum Mastery Roadmap
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Become a Quantum Valley Engineer in 3 Years
            </p>
            <p className="text-lg mb-12 text-gray-400">
              Industry-grade platform with progress tracking, curated resources, and certificates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg">
                Start Learning <ArrowRight className="inline ml-2" />
              </Link>
              <Link to="/roadmap" className="btn-secondary text-lg">
                View Roadmap
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <Calendar className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-4xl font-bold mb-2 text-gradient">3 Years</h3>
              <p className="text-gray-600 dark:text-gray-400">Comprehensive Learning Journey</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card text-center"
            >
              <Clock className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-4xl font-bold mb-2 text-gradient">3-4 Hours/Day</h3>
              <p className="text-gray-600 dark:text-gray-400">Flexible Daily Commitment</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card text-center"
            >
              <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-4xl font-bold mb-2 text-gradient">Job Ready</h3>
              <p className="text-gray-600 dark:text-gray-400">Quantum Valley Engineer</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              A complete platform designed for your quantum computing journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card"
            >
              <BookOpen className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Curated Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hand-picked learning materials from the best sources including IBM Qiskit, Google Cirq, and more
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <Rocket className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your learning journey with detailed progress metrics and milestone celebrations
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <Award className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Certificates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn certificates for each year completed to showcase your expertise
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <Calendar className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Weekly Planner</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your study schedule with interactive weekly planning tools
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Personalized Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your own learning hub with all your progress, resources, and goals in one place
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <Clock className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Flexible Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn at your own pace with a structured yet flexible curriculum
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Quantum Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of aspiring quantum engineers and start your path to Quantum Valley today
            </p>
            <Link to="/signup" className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Get Started Free <ArrowRight className="inline ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
