
import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface ResourceSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  icon?: ReactNode;
  suffix?: string;
  gradient?: 'blue' | 'purple' | 'green' | 'orange';
}

export const ResourceSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  icon,
  suffix,
  gradient = 'blue'
}: ResourceSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const gradients = {
    blue: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
    purple: 'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%)',
    green: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
    orange: 'linear-gradient(90deg, #F59E0B 0%, #FCD34D 100%)'
  };

  return (
    <div className="resource-slider">
      <div className="slider-header">
        <div className="slider-label">
          {icon && <span className="slider-icon">{icon}</span>}
          <span>{label}</span>
        </div>
        <div className="slider-value">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="value-display"
          >
            {value.toLocaleString('pt-BR')}
          </motion.span>
          {suffix && <span className="value-suffix">{suffix}</span>}
        </div>
      </div>
      
      <div className="slider-container">
        <div className="slider-track">
          <motion.div
            className="slider-fill"
            style={{
              background: gradients[gradient],
              width: `${percentage}%`
            }}
            animate={{
              boxShadow: isDragging 
                ? `0 0 20px ${gradient === 'blue' ? '#3B82F6' : gradient === 'purple' ? '#8B5CF6' : gradient === 'green' ? '#10B981' : '#F59E0B'}` 
                : 'none'
            }}
          />
          
          <motion.div
            className="slider-thumb"
            style={{ left: `${percentage}%` }}
            animate={{
              scale: isDragging ? 1.2 : 1,
              boxShadow: isDragging 
                ? '0 0 20px rgba(212, 175, 55, 0.6)' 
                : '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          />
        </div>
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input"
        />
      </div>
      
      <div className="slider-limits">
        <span className="limit-min">{min}</span>
        <span className="limit-max">{max.toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
};
