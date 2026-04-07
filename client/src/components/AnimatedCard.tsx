import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, ReactNode, MouseEvent } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade-up' | 'slide-left' | 'slide-right' | 'zoom-in' | 'flip-in';
  delay?: number;
  enableHover?: boolean;
  enableTilt?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className = '', 
  animationType = 'fade-up',
  delay = 0,
  enableHover = true,
  enableTilt = false 
}: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const animations = {
    'fade-up': {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
    },
    'slide-left': {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
    },
    'slide-right': {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
    },
    'zoom-in': {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
    },
    'flip-in': {
      initial: { opacity: 0, rotateY: -90 },
      whileInView: { opacity: 1, rotateY: 0 },
    },
  };

  const selectedAnimation = animations[animationType] || animations['fade-up'];

  return (
    <motion.div
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={enableHover ? { 
        scale: 1.05, 
        y: -8,
      } : {}}
      style={enableTilt ? { 
        rotateX: rotateX, 
        rotateY: rotateY,
        transformStyle: 'preserve-3d'
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        hover-lift border-glow relative
        ${enableHover ? 'hover:shadow-2xl' : ''}
        ${className}
      `}
    >
      {children}
      
      {enableHover && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'linear-gradient(45deg, rgba(0,184,148,0.1), rgba(9,132,227,0.1))',
          }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCard;
