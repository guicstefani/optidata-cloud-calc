
import React, { useState } from 'react'
import { useGoalsStore } from '../../stores/goalsStore'
import { formatarMoeda, formatarPorcentagem } from '../../utils/formatters'
import { MetricCard } from '../ui/GlassCard'
import { GoldButton, GoldInput } from '../ui/GoldInput'
import { Target, TrendingUp, DollarSign, Plus } from 'lucide-react'

export const GoalsDashboard = () => {
  const { 
    metaMensal, 
    getMRRAtual, 
    getProgressoMeta, 
    adicionarVenda, 
    atualizarMeta,
    vendas 
  } = useGoalsStore()
  
  const [showAddSale, setShowAddSale] = useState(false)
  const [showEditGoal, setShowEditGoal] = useState(false)
  const [newSale, setNewSale] = useState({
    cliente: '',
    valorMensal: '',
    tipo: 'nova',
    vendedor: ''
  })
  const [newGoal, setNewGoal] = useState(metaMensal)

  const mrrAtual = getMRRAtual()
  const progresso = getProgressoMeta()

  const handleAddSale = () => {
    if (newSale.cliente && newSale.valorMensal) {
      adicionarVenda({
        ...newSale,
        valorMensal: parseFloat(newSale.valorMensal)
      })
      setNewSale({ cliente: '', valorMensal: '', tipo: 'nova', vendedor: '' })
      setShowAddSale(false)
    }
  }

  const handleUpdateGoal = () => {
    atualizarMeta(newGoal)
    setShowEditGoal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gradient-text">Metas & MRR</h1>
        <div className="flex space-x-3">
          <GoldButton
            variant="outline"
            onClick={() => setShowEditGoal(true)}
          >
            <Target className="w-4 h-4 mr-2" />
            Editar Meta
          </GoldButton>
          <GoldButton onClick={() => setShowAddSale(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Venda
          </GoldButton>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="MRR Atual"
          value={formatarMoeda(mrrAtual)}
          subtitle={`${vendas.length} vendas este mês`}
          icon={DollarSign}
        />
        
        <MetricCard
          title="Meta Mensal"
          value={formatarMoeda(metaMensal)}
          subtitle="Objetivo definido"
          icon={Target}
        />
        
        <MetricCard
          title="Progresso"
          value={formatarPorcentagem(progresso)}
          subtitle={progresso >= 100 ? 'Meta atingida!' : `Faltam ${formatarMoeda(metaMensal - mrrAtual)}`}
          icon={TrendingUp}
          className={progresso >= 100 ? 'border-green-500/30 bg-green-500/5' : ''}
        />
      </div>

      {/* Barra de Progresso */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-foreground">Progresso da Meta</h3>
          <span className="text-sm text-muted-foreground">
            {Math.min(progresso, 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-dark-800 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-gold-600 to-gold-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progresso, 100)}%` }}
          />
        </div>
      </div>

      {/* Vendas Recentes */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Vendas Recentes</h3>
        {vendas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma venda registrada ainda</p>
            <p className="text-sm">Adicione sua primeira venda para começar!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vendas.slice(0, 10).map((venda) => (
              <div key={venda.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">{venda.cliente}</div>
                  <div className="text-sm text-muted-foreground">
                    {venda.tipo} • {venda.vendedor}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gold-400">
                    {formatarMoeda(venda.valorMensal)}/mês
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(venda.data).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialog Nova Venda */}
      {showAddSale && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Registrar Nova Venda</h3>
            <div className="space-y-4">
              <GoldInput
                label="Nome do Cliente"
                value={newSale.cliente}
                onChange={(e) => setNewSale({ ...newSale, cliente: e.target.value })}
                placeholder="Ex: Empresa ABC"
              />
              
              <GoldInput
                label="Valor Mensal"
                type="number"
                value={newSale.valorMensal}
                onChange={(e) => setNewSale({ ...newSale, valorMensal: e.target.value })}
                prefix="R$"
                placeholder="0,00"
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Tipo de Venda</label>
                <select
                  value={newSale.tipo}
                  onChange={(e) => setNewSale({ ...newSale, tipo: e.target.value })}
                  className="gold-input"
                >
                  <option value="nova">Nova Venda</option>
                  <option value="upgrade">Upgrade</option>
                  <option value="renovacao">Renovação</option>
                </select>
              </div>
              
              <GoldInput
                label="Vendedor"
                value={newSale.vendedor}
                onChange={(e) => setNewSale({ ...newSale, vendedor: e.target.value })}
                placeholder="Nome do vendedor"
              />
              
              <div className="flex space-x-3">
                <GoldButton onClick={handleAddSale} className="flex-1">
                  Registrar
                </GoldButton>
                <GoldButton
                  variant="secondary"
                  onClick={() => setShowAddSale(false)}
                  className="flex-1"
                >
                  Cancelar
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Editar Meta */}
      {showEditGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Editar Meta Mensal</h3>
            <div className="space-y-4">
              <GoldInput
                label="Nova Meta Mensal"
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(parseFloat(e.target.value) || 0)}
                prefix="R$"
              />
              
              <div className="flex space-x-3">
                <GoldButton onClick={handleUpdateGoal} className="flex-1">
                  Atualizar
                </GoldButton>
                <GoldButton
                  variant="secondary"
                  onClick={() => setShowEditGoal(false)}
                  className="flex-1"
                >
                  Cancelar
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
