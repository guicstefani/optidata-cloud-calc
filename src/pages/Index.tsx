
import React, { useState } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { CalculatorMain } from '../components/calculator/CalculatorMain'
import { GoalsDashboard } from '../components/goals/GoalsDashboard'

const Index = () => {
  const [activeSection, setActiveSection] = useState('calculator')

  const renderContent = () => {
    switch (activeSection) {
      case 'calculator':
        return <CalculatorMain />
      case 'goals':
        return <GoalsDashboard />
      case 'templates':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold gradient-text mb-4">Templates</h2>
            <p className="text-muted-foreground">Gerenciamento avançado de templates em desenvolvimento</p>
          </div>
        )
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold gradient-text mb-4">Configurações</h2>
            <p className="text-muted-foreground">Painel de configurações em desenvolvimento</p>
          </div>
        )
      default:
        return <CalculatorMain />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default Index
