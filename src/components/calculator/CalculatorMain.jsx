
import React from 'react'
import { useCalculatorStore } from '../../stores/calculatorStore'
import { CalculatorInputs } from './CalculatorInputs'
import { CalculatorResults } from './CalculatorResults'
import { TemplateSelector } from '../templates/TemplateSelector'
import { GlassCard } from '../ui/GlassCard'

export const CalculatorMain = () => {
  const { inputs, results } = useCalculatorStore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Calculadora Cloud Profissional
        </h1>
        <p className="text-muted-foreground">
          Configure sua infraestrutura e obtenha cotações precisas em tempo real
        </p>
      </div>

      {/* Templates */}
      <GlassCard className="p-6">
        <TemplateSelector />
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Configuração da Infraestrutura
          </h2>
          <CalculatorInputs />
        </GlassCard>

        {/* Results */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Resultado do Cálculo
          </h2>
          <CalculatorResults />
        </GlassCard>
      </div>
    </div>
  )
}
