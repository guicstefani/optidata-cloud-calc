
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false 
}: GlassCardProps) => {
  return (
    <motion.div
      className={`glass-card ${className} ${glow ? 'glass-card-glow' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { 
        y: -4,
        transition: { type: "spring", stiffness: 300 }
      } : {}}
    >
      {/* Borda superior dourada */}
      <div className="glass-card-border" />
      
      {/* Conteúdo */}
      <div className="glass-card-content">
        {children}
      </div>
      
      {/* Reflexo de luz */}
      <div className="glass-card-shine" />
    </motion.div>
  );
};
