import { motion } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

const GlitchText = ({ children, className = '' }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative z-10"
        animate={isGlitching ? {
          x: [0, -3, 3, -2, 2, 0],
          textShadow: [
            '0 0 0 transparent',
            '-2px 0 0 #2DAA60, 2px 0 0 #25884d',
            '2px 0 0 #2DAA60, -2px 0 0 #25884d',
            '0 0 0 transparent',
          ],
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 text-accent-500 opacity-50"
            style={{ transform: 'translate(-2px, 0)' }}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute inset-0 text-accent-600 opacity-50"
            style={{ transform: 'translate(2px, 0)' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default GlitchText;
