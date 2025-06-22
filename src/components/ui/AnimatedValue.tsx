
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedValueProps {
  value: number;
  format?: 'currency' | 'number' | 'percentage';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  showTrend?: boolean;
}

export const AnimatedValue = ({
  value,
  format = 'currency',
  size = 'lg',
  label,
  showTrend = false
}: AnimatedValueProps) => {
  const spring = useSpring(0, { 
    stiffness: 50, 
    damping: 20 
  });
  
  const display = useTransform(spring, (current) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(current);
      case 'percentage':
        return `${current.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('pt-BR').format(current);
    }
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  return (
    <motion.div
      className="animated-value-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {label && (
        <motion.p 
          className="value-label"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.p>
      )}
      
      <div className="value-wrapper">
        <motion.h2
          className={`animated-value ${sizeClasses[size]}`}
          style={{
            background: 'linear-gradient(135deg, #F4E4BA 0%, #D4AF37 50%, #B8941F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(212, 175, 55, 0.5)'
          }}
        >
          {display}
        </motion.h2>
      </div>
      
      {/* Partículas douradas */}
      <div className="value-particles">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="particle"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
