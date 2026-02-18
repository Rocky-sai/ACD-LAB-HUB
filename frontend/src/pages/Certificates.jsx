import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';
import { Award, Download, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const response = await progressAPI.getProgress();
      setCertificates(response.data.certificates || []);
    } catch (error) {
      console.error('Error loading certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const canGenerateCertificate = (year) => {
    return !certificates.some(cert => cert.year === year);
  };

  const generateCertificate = async (year) => {
    setGenerating(true);
    try {
      const response = await progressAPI.generateCertificate({ year });
      const certificate = response.data.certificate;
      
      // Generate PDF
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Background
      doc.setFillColor(249, 250, 251);
      doc.rect(0, 0, 297, 210, 'F');

      // Border
      doc.setDrawColor(99, 102, 241);
      doc.setLineWidth(2);
      doc.rect(10, 10, 277, 190);

      // Title
      doc.setFontSize(32);
      doc.setTextColor(99, 102, 241);
      doc.text('Certificate of Completion', 148.5, 40, { align: 'center' });

      // Subtitle
      doc.setFontSize(18);
      doc.setTextColor(75, 85, 99);
      doc.text('Quantum Valley Engineer Program', 148.5, 55, { align: 'center' });

      // Body
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55);
      doc.text('This certifies that', 148.5, 80, { align: 'center' });

      // Name
      doc.setFontSize(28);
      doc.setTextColor(124, 58, 237);
      doc.text(certificate.name, 148.5, 100, { align: 'center' });

      // Achievement
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55);
      doc.text(`has successfully completed Year ${year} of the`, 148.5, 120, { align: 'center' });
      doc.text('3-Year Quantum Mastery Roadmap', 148.5, 130, { align: 'center' });

      // Date
      doc.setFontSize(12);
      doc.setTextColor(107, 114, 128);
      doc.text(`Date: ${new Date(certificate.generatedAt).toLocaleDateString()}`, 148.5, 150, { align: 'center' });

      // Certificate ID
      doc.setFontSize(10);
      doc.text(`Certificate ID: ${certificate.certificateId}`, 148.5, 160, { align: 'center' });

      // Signature line
      doc.setLineWidth(0.5);
      doc.line(120, 180, 177, 180);
      doc.setFontSize(10);
      doc.text('Authorized Signature', 148.5, 187, { align: 'center' });

      // Download
      doc.save(`Quantum-Valley-Year${year}-Certificate.pdf`);
      
      await loadCertificates();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const downloadCertificate = (certificate) => {
    generateCertificatePDF(certificate);
  };

  const generateCertificatePDF = (certificate) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFillColor(249, 250, 251);
    doc.rect(0, 0, 297, 210, 'F');
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    doc.setFontSize(32);
    doc.setTextColor(99, 102, 241);
    doc.text('Certificate of Completion', 148.5, 40, { align: 'center' });
    doc.setFontSize(18);
    doc.setTextColor(75, 85, 99);
    doc.text('Quantum Valley Engineer Program', 148.5, 55, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.text('This certifies that', 148.5, 80, { align: 'center' });
    doc.setFontSize(28);
    doc.setTextColor(124, 58, 237);
    doc.text(user.name, 148.5, 100, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.text(`has successfully completed Year ${certificate.year} of the`, 148.5, 120, { align: 'center' });
    doc.text('3-Year Quantum Mastery Roadmap', 148.5, 130, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128);
    doc.text(`Date: ${new Date(certificate.generatedAt).toLocaleDateString()}`, 148.5, 150, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Certificate ID: ${certificate.certificateId}`, 148.5, 160, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(120, 180, 177, 180);
    doc.setFontSize(10);
    doc.text('Authorized Signature', 148.5, 187, { align: 'center' });
    doc.save(`Quantum-Valley-Year${certificate.year}-Certificate.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <Award className="inline mr-3 text-purple-600" size={40} />
            <span className="text-gradient">Your Certificates</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Generate and download certificates for completed years
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((year) => {
            const certificate = certificates.find(cert => cert.year === year);
            const canGenerate = canGenerateCertificate(year);
            
            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: year * 0.1 }}
                className="card"
              >
                <div className="text-center mb-4">
                  <Award className="w-16 h-16 mx-auto mb-3 text-purple-600" />
                  <h3 className="text-2xl font-bold mb-2">Year {year}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {year === 1 && 'Foundations'}
                    {year === 2 && 'Development'}
                    {year === 3 && 'Industry & Job Prep'}
                  </p>
                </div>

                {certificate ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">
                        ✓ Certificate Generated
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(certificate.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => downloadCertificate(certificate)}
                      className="w-full btn-primary"
                    >
                      <Download className="inline mr-2" size={18} />
                      Download PDF
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => generateCertificate(year)}
                    disabled={generating || !canGenerate}
                    className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {generating ? 'Generating...' : canGenerate ? 'Generate Certificate' : 'Complete Year First'}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {certificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Calendar className="mr-2 text-purple-600" />
              Certificate History
            </h2>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">Year {cert.year} Certificate</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generated on {new Date(cert.generatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">ID: {cert.certificateId}</p>
                  </div>
                  <button
                    onClick={() => downloadCertificate(cert)}
                    className="btn-secondary"
                  >
                    <Download className="inline mr-2" size={18} />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
