
import React, { useState } from 'react'
import { PremiumSidebar } from '../components/layout/PremiumSidebar'
import { VMConfigurator } from '../components/calculator/VMConfigurator'
import { GoalsDashboard } from '../components/goals/GoalsDashboard'

const Index = () => {
  const [activeSection, setActiveSection] = useState('calculator')

  const renderContent = () => {
    switch (activeSection) {
      case 'calculator':
        return <VMConfigurator />
      case 'goals':
        return <GoalsDashboard />
      case 'templates':
        return (
          <div className="text-center py-24">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">
                Templates
              </span>
            </h2>
            <p className="text-xl text-gray-400">Sistema de templates em desenvolvimento</p>
          </div>
        )
      case 'config':
        return (
          <div className="text-center py-24">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">
                Configurações
              </span>
            </h2>
            <p className="text-xl text-gray-400">Painel de configurações em desenvolvimento</p>
          </div>
        )
      default:
        return <VMConfigurator />
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Fundo animado */}
      <div className="animated-bg" />
      
      <PremiumSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="ml-80 p-8 relative z-10">
        {renderContent()}
      </main>
    </div>
  )
}

export default Index
