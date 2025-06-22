
import React, { useState } from 'react'
import { useCalculatorStore } from '../../stores/calculatorStore'
import { TEMPLATES } from '../../utils/calculations'
import { GoldButton } from '../ui/GoldInput'
import { Download, Upload, Save } from 'lucide-react'

export const TemplateSelector = () => {
  const { loadTemplate, saveTemplate, templates } = useCalculatorStore()
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')

  const handleLoadPredefinedTemplate = (templateKey) => {
    const template = TEMPLATES[templateKey]
    loadTemplate(template.config)
  }

  const handleSaveTemplate = () => {
    if (templateName.trim()) {
      saveTemplate(templateName, templateDescription)
      setTemplateName('')
      setTemplateDescription('')
      setShowSaveDialog(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gold-400">Templates Rápidos</h3>
        <div className="flex space-x-2">
          <GoldButton
            variant="outline"
            onClick={() => setShowSaveDialog(true)}
            className="text-xs px-3 py-2"
          >
            <Save className="w-3 h-3 mr-1" />
            Salvar
          </GoldButton>
        </div>
      </div>

      {/* Templates Predefinidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(TEMPLATES).map(([key, template]) => (
          <div
            key={key}
            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-gold-500/30 transition-colors cursor-pointer"
            onClick={() => handleLoadPredefinedTemplate(key)}
          >
            <h4 className="font-medium text-foreground mb-1">{template.nome}</h4>
            <p className="text-xs text-muted-foreground mb-2">{template.categoria}</p>
            <p className="text-xs text-muted-foreground">{template.descricao}</p>
          </div>
        ))}
      </div>

      {/* Templates Salvos */}
      {templates.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gold-400">Seus Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-gold-500/30 transition-colors cursor-pointer"
                onClick={() => loadTemplate(template.config)}
              >
                <h5 className="font-medium text-foreground text-sm">{template.name}</h5>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dialog de Salvar Template */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Salvar Template</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome do template"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="gold-input"
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                className="gold-input min-h-[80px]"
              />
              <div className="flex space-x-3">
                <GoldButton onClick={handleSaveTemplate} className="flex-1">
                  Salvar
                </GoldButton>
                <GoldButton
                  variant="secondary"
                  onClick={() => setShowSaveDialog(false)}
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
