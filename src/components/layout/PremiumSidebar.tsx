
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calculator, Target, FileTemplate, Settings, ChevronLeft } from 'lucide-react';

const menuItems = [
  { id: 'calculator', label: 'Calculadora', icon: Calculator, path: '/' },
  { id: 'goals', label: 'Metas & MRR', icon: Target, path: '/goals' },
  { id: 'templates', label: 'Templates', icon: FileTemplate, path: '/templates' },
  { id: 'config', label: 'Configurações', icon: Settings, path: '/config' },
];

interface PremiumSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const PremiumSidebar = ({ activeSection, onSectionChange }: PremiumSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen bg-black/80 backdrop-blur-xl border-r border-gold-primary/10 flex flex-col z-50"
      animate={{
        width: isCollapsed ? 80 : 280
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="p-8 border-b border-gold-primary/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-light to-gold-dark rounded-lg flex items-center justify-center">
            <span className="text-black font-bold">O</span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-lg font-bold bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">
                OptiData
              </span>
              <p className="text-xs text-gray-400">Cloud Calculator</p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Menu */}
      <nav className="flex-1 py-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                relative w-full flex items-center gap-4 px-6 py-4 text-left
                transition-all duration-300 group
                ${isActive 
                  ? 'text-gold-primary bg-gold-primary/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="flex-shrink-0"
                animate={{
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? '#D4AF37' : undefined
                }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              
              {!isCollapsed && (
                <motion.span
                  className="font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.label}
                </motion.span>
              )}
              
              {isActive && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-light to-gold-primary shadow-lg shadow-gold-primary/50"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
      
      {/* Toggle Button */}
      <button
        className="absolute -right-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-900 border border-gold-primary/20 rounded-full flex items-center justify-center hover:bg-gold-primary/10 hover:border-gold-primary transition-all duration-300"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4 text-gold-primary" />
        </motion.div>
      </button>
    </motion.aside>
  );
};
