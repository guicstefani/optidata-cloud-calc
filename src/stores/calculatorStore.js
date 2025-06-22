
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calcularVM } from '../utils/calculations'

export const useCalculatorStore = create(
  persist(
    (set, get) => ({
      // Estado dos inputs
      inputs: {
        name: '',
        vcpu: 4,
        ramGB: 16,
        storageSSD: 200,
        storageFCM: 0,
        so: 'ubuntu',
        database: 'postgresql',
        tipoBackup: 'padrao',
        monitoramento: true,
        antivirus: false,
        ipsAdicionais: 0
      },
      
      // Resultados calculados
      results: {
        monthly: 0,
        annual: 0,
        breakdown: {
          compute: 0,
          memory: 0,
          storage: 0,
          backup: 0,
          monitoring: 0,
          licenses: 0
        }
      },
      
      // Actions
      updateInput: (field, value) => {
        set((state) => ({
          inputs: { ...state.inputs, [field]: value }
        }))
      },
      
      calculateResults: () => {
        const { inputs } = get()
        const results = calcularVM(inputs)
        
        set({
          results: {
            monthly: results.total,
            annual: results.total * 12,
            breakdown: {
              compute: results.compute,
              memory: results.memoria,
              storage: results.armazenamento,
              backup: results.backup,
              monitoring: results.monitoramento,
              licenses: results.licencas
            }
          }
        })
      },
      
      resetInputs: () => {
        set({
          inputs: {
            name: '',
            vcpu: 4,
            ramGB: 16,
            storageSSD: 200,
            storageFCM: 0,
            so: 'ubuntu',
            database: 'postgresql',
            tipoBackup: 'padrao',
            monitoramento: true,
            antivirus: false,
            ipsAdicionais: 0
          }
        })
      }
    }),
    {
      name: 'calculator-storage',
      partialize: (state) => ({ inputs: state.inputs })
    }
  )
)
