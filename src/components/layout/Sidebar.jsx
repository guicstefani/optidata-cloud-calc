
import React, { useState } from 'react'
import { Calculator, Target, FileText, Settings, Menu } from 'lucide-react'

const sidebarItems = [
  { id: 'calculator', icon: Calculator, label: 'Calculadora', active: true },
  { id: 'goals', icon: Target, label: 'Metas & MRR' },
  { id: 'templates', icon: FileText, label: 'Templates' },
  { id: 'settings', icon: Settings, label: 'Configurações' }
]

export const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`
      fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      <div className="glass-card h-full m-2 p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold gradient-text">OptiData</h1>
              <p className="text-xs text-muted-foreground">Cloud Calculator</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="neumorph-button p-2 hover:bg-gold-500/10"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`
                      w-full flex items-center p-3 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400' 
                        : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="text-xs text-muted-foreground text-center">
              v1.0.0 - Professional Edition
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
