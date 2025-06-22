
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { FuturisticInput } from '../ui/FuturisticInput';
import { ResourceSlider } from './ResourceSlider';
import { AnimatedValue } from '../ui/AnimatedValue';
import { GoldButton } from '../ui/GoldButton';
import { Cpu, HardDrive, MemoryStick, Server, Save, Template } from 'lucide-react';
import { useCalculatorStore } from '../../stores/calculatorStore';

export const VMConfigurator = () => {
  const { inputs, updateInput, results, calculateResults } = useCalculatorStore();

  const handleInputChange = (field: string, value: any) => {
    updateInput(field, value);
    calculateResults();
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Coluna Principal - Configuração */}
        <div className="lg:col-span-2">
          <GlassCard glow>
            <h2 className="text-3xl font-bold mb-8">
              <span 
                className="bg-gradient-to-r from-[#F4E4BA] via-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent"
              >
                Configuração da Máquina Virtual
              </span>
            </h2>
            
            <FuturisticInput
              label="Nome da VM"
              value={inputs.name || ''}
              onChange={(value) => handleInputChange('name', value)}
              icon={<Server className="w-5 h-5" />}
            />
            
            <div className="mt-10">
              <h3 className="text-lg text-gray-400 uppercase tracking-wide mb-6">
                Recursos Computacionais
              </h3>
              
              <ResourceSlider
                label="vCPU"
                value={inputs.vcpu}
                min={1}
                max={128}
                step={1}
                onChange={(value) => handleInputChange('vcpu', value)}
                icon={<Cpu className="w-5 h-5" />}
                suffix="cores"
                gradient="blue"
              />
              
              <ResourceSlider
                label="Memória RAM"
                value={inputs.ramGB}
                min={1}
                max={1024}
                step={1}
                onChange={(value) => handleInputChange('ramGB', value)}
                icon={<MemoryStick className="w-5 h-5" />}
                suffix="GB"
                gradient="purple"
              />
            </div>
            
            <div className="mt-10">
              <h3 className="text-lg text-gray-400 uppercase tracking-wide mb-6">
                Armazenamento
              </h3>
              
              <ResourceSlider
                label="Storage SSD"
                value={inputs.storageSSD}
                min={0}
                max={10000}
                step={100}
                onChange={(value) => handleInputChange('storageSSD', value)}
                icon={<HardDrive className="w-5 h-5" />}
                suffix="GB"
                gradient="green"
              />
              
              <ResourceSlider
                label="Storage FCM"
                value={inputs.storageFCM}
                min={0}
                max={50000}
                step={500}
                onChange={(value) => handleInputChange('storageFCM', value)}
                icon={<HardDrive className="w-5 h-5" />}
                suffix="GB"
                gradient="orange"
              />
            </div>
          </GlassCard>
        </div>
        
        {/* Coluna Lateral - Resumo e Ações */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-6"
          >
            <GlassCard glow className="mb-6">
              <h3 className="text-xl text-gray-400 mb-4">Custo Mensal</h3>
              <AnimatedValue
                value={results.monthly}
                size="xl"
                format="currency"
              />
              
              <div className="mt-8 pt-6 border-t border-gold-primary/20">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Computação:</span>
                    <span className="text-white font-medium">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(results.breakdown?.compute || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Memória:</span>
                    <span className="text-white font-medium">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(results.breakdown?.memory || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Armazenamento:</span>
                    <span className="text-white font-medium">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(results.breakdown?.storage || 0)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <GoldButton variant="primary" size="lg" fullWidth>
                  <Save className="w-4 h-4" />
                  Salvar Configuração
                </GoldButton>
                <GoldButton variant="secondary" size="lg" fullWidth>
                  <Template className="w-4 h-4" />
                  Salvar como Template
                </GoldButton>
              </div>
            </GlassCard>
            
            <GlassCard className="text-center">
              <h4 className="text-lg text-gray-400 mb-3">Projeção Anual</h4>
              <AnimatedValue
                value={results.monthly * 12}
                size="md"
                format="currency"
              />
              <p className="text-green-400 text-sm mt-2">
                Economize 15% com contrato anual
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
