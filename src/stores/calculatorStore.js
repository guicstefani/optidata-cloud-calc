
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calcularVM } from '../utils/calculations'

export const useCalculatorStore = create(
  persist(
    (set, get) => ({
      // Estado dos inputs
      inputs: {
        vcpu: 4,
        ramGB: 16,
        storageFCM: 0,
        storageSSD: 200,
        so: 'ubuntu',
        database: 'postgresql',
        monitoramento: true,
        tipoBackup: 'padrao',
        antivirus: false,
        ipsAdicionais: 0
      },
      
      // Resultados dos cálculos
      results: {
        compute: 0,
        memoria: 0,
        armazenamento: 0,
        backup: 0,
        monitoramento: 0,
        licencas: 0,
        total: 0
      },
      
      // Templates salvos
      templates: [],
      
      // Actions
      updateInput: (field, value) => {
        set((state) => ({
          inputs: { ...state.inputs, [field]: value }
        }))
        // Recalcular automaticamente
        get().calculateResults()
      },
      
      calculateResults: () => {
        const { inputs } = get()
        const results = calcularVM(inputs)
        set({ results })
      },
      
      loadTemplate: (templateConfig) => {
        set({ inputs: templateConfig })
        get().calculateResults()
      },
      
      saveTemplate: (name, description) => {
        const { inputs, templates } = get()
        const newTemplate = {
          id: Date.now(),
          name,
          description,
          config: { ...inputs },
          createdAt: new Date().toISOString()
        }
        set({ templates: [...templates, newTemplate] })
      },
      
      deleteTemplate: (id) => {
        const { templates } = get()
        set({ templates: templates.filter(t => t.id !== id) })
      },
      
      resetInputs: () => {
        set({
          inputs: {
            vcpu: 4,
            ramGB: 16,
            storageFCM: 0,
            storageSSD: 200,
            so: 'ubuntu',
            database: 'postgresql',
            monitoramento: true,
            tipoBackup: 'padrao',
            antivirus: false,
            ipsAdicionais: 0
          }
        })
        get().calculateResults()
      }
    }),
    {
      name: 'calculator-storage',
      partialize: (state) => ({ 
        inputs: state.inputs, 
        templates: state.templates 
      })
    }
  )
)

// Inicializar cálculos
useCalculatorStore.getState().calculateResults()
