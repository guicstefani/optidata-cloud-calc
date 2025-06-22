
import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface FuturisticInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  suffix?: string;
  icon?: ReactNode;
}

export const FuturisticInput = ({
  label,
  value,
  onChange,
  type = 'text',
  suffix,
  icon
}: FuturisticInputProps) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="futuristic-input-wrapper">
      <motion.div
        className="futuristic-input-container"
        animate={{
          borderColor: focused 
            ? 'rgba(212, 175, 55, 0.6)' 
            : hovered 
              ? 'rgba(212, 175, 55, 0.3)'
              : 'rgba(212, 175, 55, 0.1)'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {icon && (
          <motion.div 
            className="input-icon"
            animate={{ 
              color: focused ? '#D4AF37' : '#6B6B7B',
              rotate: focused ? 360 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        )}
        
        <div className="input-field-wrapper">
          <motion.label
            className="input-label"
            animate={{
              y: focused || value ? -20 : 0,
              scale: focused || value ? 0.85 : 1,
              color: focused ? '#D4AF37' : '#B8B8B8'
            }}
          >
            {label}
          </motion.label>
          
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="futuristic-input"
          />
          
          {suffix && (
            <span className="input-suffix">{suffix}</span>
          )}
        </div>
        
        {/* Linha de foco animada */}
        <motion.div
          className="focus-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};
