
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useGoalsStore = create(
  persist(
    (set, get) => ({
      // Estado
      metaMensal: 100000, // R$ 100k
      vendas: [], // Array de vendas realizadas
      
      // Métricas calculadas
      getMRRAtual: () => {
        const vendas = get().vendas
        const mesAtual = new Date().getMonth()
        const anoAtual = new Date().getFullYear()
        
        return vendas
          .filter(v => {
            const data = new Date(v.data)
            return data.getMonth() === mesAtual && 
                   data.getFullYear() === anoAtual
          })
          .reduce((total, venda) => total + venda.valorMensal, 0)
      },
      
      getProgressoMeta: () => {
        const mrr = get().getMRRAtual()
        const meta = get().metaMensal
        return (mrr / meta) * 100
      },
      
      getVendasPorDia: () => {
        const vendas = get().vendas
        const mesAtual = new Date().getMonth()
        const anoAtual = new Date().getFullYear()
        
        const vendasMes = vendas.filter(v => {
          const data = new Date(v.data)
          return data.getMonth() === mesAtual && 
                 data.getFullYear() === anoAtual
        })
        
        // Agrupar por dia
        const vendaPorDia = {}
        vendasMes.forEach(venda => {
          const dia = new Date(venda.data).getDate()
          if (!vendaPorDia[dia]) {
            vendaPorDia[dia] = 0
          }
          vendaPorDia[dia] += venda.valorMensal
        })
        
        return Object.entries(vendaPorDia).map(([dia, valor]) => ({
          dia: parseInt(dia),
          valor
        }))
      },
      
      // Actions
      adicionarVenda: (venda) => set((state) => ({
        vendas: [...state.vendas, {
          id: Date.now(),
          data: new Date().toISOString(),
          cliente: venda.cliente,
          valorMensal: venda.valorMensal,
          valorAnual: venda.valorMensal * 12,
          tipo: venda.tipo, // 'nova', 'upgrade', 'renovacao'
          vendedor: venda.vendedor || 'Não informado'
        }]
      })),
      
      atualizarMeta: (novaMeta) => set({ metaMensal: novaMeta }),
      
      removerVenda: (id) => set((state) => ({
        vendas: state.vendas.filter(v => v.id !== id)
      }))
    }),
    {
      name: 'goals-storage'
    }
  )
)
