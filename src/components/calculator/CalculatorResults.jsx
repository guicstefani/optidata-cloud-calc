
import React from 'react'
import { useCalculatorStore } from '../../stores/calculatorStore'
import { formatarMoeda } from '../../utils/formatters'
import { Calculator, Database, HardDrive, Shield, Monitor, Cpu } from 'lucide-react'

const resultItems = [
  { key: 'compute', label: 'Processamento (vCPU)', icon: Cpu },
  { key: 'memoria', label: 'Memória (RAM)', icon: Database },
  { key: 'armazenamento', label: 'Armazenamento', icon: HardDrive },
  { key: 'backup', label: 'Backup', icon: Shield },
  { key: 'monitoramento', label: 'Monitoramento', icon: Monitor },
  { key: 'licencas', label: 'Licenças', icon: Calculator }
]

export const CalculatorResults = () => {
  const { results } = useCalculatorStore()

  return (
    <div className="space-y-6">
      {/* Total em destaque */}
      <div className="text-center p-6 bg-gradient-to-r from-gold-600/10 to-gold-500/10 rounded-xl border border-gold-500/30">
        <div className="text-sm text-gold-400 font-medium mb-2">CUSTO TOTAL MENSAL</div>
        <div className="text-4xl font-bold gradient-text mb-2">
          {formatarMoeda(results.total)}
        </div>
        <div className="text-sm text-muted-foreground">
          Anual: {formatarMoeda(results.total * 12)}
        </div>
      </div>

      {/* Breakdown detalhado */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gold-400 uppercase tracking-wide">
          Detalhamento dos Custos
        </h4>
        
        {resultItems.map(({ key, label, icon: Icon }) => {
          const value = results[key] || 0
          if (value === 0) return null
          
          return (
            <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-gold-400" />
                <span className="text-foreground text-sm">{label}</span>
              </div>
              <span className="text-gold-400 font-medium">
                {formatarMoeda(value)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Estatísticas adicionais */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">
            {formatarMoeda(results.total / 30)}
          </div>
          <div className="text-xs text-muted-foreground">Por dia</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">
            {formatarMoeda(results.total / (30 * 24))}
          </div>
          <div className="text-xs text-muted-foreground">Por hora</div>
        </div>
      </div>
    </div>
  )
}
