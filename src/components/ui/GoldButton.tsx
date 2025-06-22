
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GoldButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const GoldButton = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false
}: GoldButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black',
    secondary: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border border-gold-primary/30',
    outline: 'border-2 border-gold-primary/60 text-gold-primary bg-transparent'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-semibold
        transition-all duration-300
        flex items-center justify-center gap-2
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
