import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

function AIPopup({ onClose, projects = [] }) {
  const [aiInput, setAiInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('general');
  const [selectedProject, setSelectedProject] = useState('');
  const [usePrivateData, setUsePrivateData] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAiResponse('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      const mockResponse = `AI response for project "${selectedProject}" with ${usePrivateData ? 'private' : 'public'} data in ${selectedRole} role: ${aiInput}`;
      setAiResponse(mockResponse);
    } catch (error) {
      setError('Oops! It seems our AI is taking a quick break. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={constraintsRef}
        style={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          style={styles.popup}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          drag
          dragControls={dragControls}
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          whileDrag={{ scale: 1.05 }}
          dragMomentum={false}
        >
          <motion.div
            style={styles.dragHandle}
            onPointerDown={(e) => dragControls.start(e)}
          >
            <h2 style={styles.title}>TCS AI Assistant</h2>
          </motion.div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a Project</option>
              {projects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask AI Assistant..."
                style={styles.input}
              />
              <motion.button
                type="submit"
                style={styles.submitButton}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? '...' : '➤'}
              </motion.button>
            </div>
            <div style={styles.optionsContainer}>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={styles.select}
              >
                <option value="general">General</option>
                <option value="product_manager">Product Manager</option>
                <option value="developer">Developer</option>
                <option value="tester">Tester</option>
              </select>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={usePrivateData}
                  onChange={(e) => setUsePrivateData(e.target.checked)}
                  style={styles.checkbox}
                />
                Use Private Data
              </label>
            </div>
          </form>
          {error && <p style={styles.error}>{error}</p>}
          {aiResponse && (
            <motion.div
              style={styles.responseContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={styles.responseTitle}>AI Response:</h3>
              <p style={styles.response}>{aiResponse}</p>
            </motion.div>
          )}
          <motion.button
            onClick={onClose}
            style={styles.closeButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '400px',
    color: '#333333',
    position: 'relative',
    overflow: 'hidden',
  },
  dragHandle: {
    background: 'linear-gradient(135deg, #0072BC 0%, #41B6E6 100%)',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px 8px 0 0',
    cursor: 'move',
  },
  title: {
    fontSize: '24px',
    margin: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '16px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px 0 0 6px',
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  submitButton: {
    padding: '12px 20px',
    fontSize: '20px',
    backgroundColor: '#FF6B00',
    color: '#fff',
    border: 'none',
    borderRadius: '0 6px 6px 0',
    cursor: 'pointer',
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginBottom: '16px',
    width: '100%',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333333',
  },
  checkbox: {
    marginRight: '8px',
  },
  error: {
    color: '#FF6B00',
    marginTop: '16px',
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: '24px',
    backgroundColor: '#f0f0f0',
    padding: '16px',
    borderRadius: '8px',
  },
  responseTitle: {
    fontSize: '20px',
    marginBottom: '12px',
    color: '#333333',
  },
  response: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ffffff',
  },
};

export default AIPopup;