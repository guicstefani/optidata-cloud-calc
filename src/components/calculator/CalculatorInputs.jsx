
import React from 'react'
import { useCalculatorStore } from '../../stores/calculatorStore'
import { GoldInput, GoldSelect } from '../ui/GoldInput'

const soOptions = [
  { value: 'ubuntu', label: 'Ubuntu Server (Gratuito)' },
  { value: 'centos', label: 'CentOS (Gratuito)' },
  { value: 'rhel', label: 'Red Hat Enterprise Linux' },
  { value: 'windows-server-standard', label: 'Windows Server Standard' },
  { value: 'windows-server-datacenter', label: 'Windows Server Datacenter' }
]

const databaseOptions = [
  { value: 'postgresql', label: 'PostgreSQL (Gratuito)' },
  { value: 'mysql', label: 'MySQL Community (Gratuito)' },
  { value: 'sql-server-standard', label: 'SQL Server Standard' },
  { value: 'sql-server-enterprise', label: 'SQL Server Enterprise' }
]

const backupOptions = [
  { value: 'none', label: 'Sem Backup' },
  { value: 'padrao', label: 'Backup Padrão (30%)' },
  { value: 'duplo', label: 'Backup Duplo (60%)' },
  { value: 'triplo', label: 'Backup Triplo (90%)' }
]

export const CalculatorInputs = () => {
  const { inputs, updateInput } = useCalculatorStore()

  return (
    <div className="space-y-6">
      {/* Recursos Computacionais */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gold-400 border-b border-gold-500/20 pb-2">
          Recursos Computacionais
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GoldInput
            label="vCPUs"
            type="number"
            min="1"
            max="128"
            value={inputs.vcpu}
            onChange={(e) => updateInput('vcpu', parseInt(e.target.value) || 1)}
            suffix="cores"
          />
          
          <GoldInput
            label="Memória RAM"
            type="number"
            min="1"
            max="1024"
            value={inputs.ramGB}
            onChange={(e) => updateInput('ramGB', parseInt(e.target.value) || 1)}
            suffix="GB"
          />
        </div>
      </div>

      {/* Armazenamento */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gold-400 border-b border-gold-500/20 pb-2">
          Armazenamento
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GoldInput
            label="Storage SSD"
            type="number"
            min="0"
            value={inputs.storageSSD}
            onChange={(e) => updateInput('storageSSD', parseInt(e.target.value) || 0)}
            suffix="GB"
          />
          
          <GoldInput
            label="Storage FCM"
            type="number"
            min="0"
            value={inputs.storageFCM}
            onChange={(e) => updateInput('storageFCM', parseInt(e.target.value) || 0)}
            suffix="GB"
          />
        </div>
      </div>

      {/* Sistema Operacional e Banco */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gold-400 border-b border-gold-500/20 pb-2">
          Software
        </h3>
        
        <div className="space-y-4">
          <GoldSelect
            label="Sistema Operacional"
            value={inputs.so}
            onChange={(e) => updateInput('so', e.target.value)}
            options={soOptions}
          />
          
          <GoldSelect
            label="Banco de Dados"
            value={inputs.database}
            onChange={(e) => updateInput('database', e.target.value)}
            options={databaseOptions}
          />
        </div>
      </div>

      {/* Serviços Adicionais */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gold-400 border-b border-gold-500/20 pb-2">
          Serviços Adicionais
        </h3>
        
        <div className="space-y-4">
          <GoldSelect
            label="Tipo de Backup"
            value={inputs.tipoBackup}
            onChange={(e) => updateInput('tipoBackup', e.target.value)}
            options={backupOptions}
          />
          
          <GoldInput
            label="IPs Adicionais"
            type="number"
            min="0"
            max="10"
            value={inputs.ipsAdicionais}
            onChange={(e) => updateInput('ipsAdicionais', parseInt(e.target.value) || 0)}
            suffix="IPs"
          />
          
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inputs.monitoramento}
                onChange={(e) => updateInput('monitoramento', e.target.checked)}
                className="form-checkbox h-4 w-4 text-gold-500 bg-dark-900 border-gold-500/30 rounded focus:ring-gold-500/20"
              />
              <span className="text-sm text-foreground">Monitoramento (R$ 100/mês)</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inputs.antivirus}
                onChange={(e) => updateInput('antivirus', e.target.checked)}
                className="form-checkbox h-4 w-4 text-gold-500 bg-dark-900 border-gold-500/30 rounded focus:ring-gold-500/20"
              />
              <span className="text-sm text-foreground">Antivírus (R$ 55/mês)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
