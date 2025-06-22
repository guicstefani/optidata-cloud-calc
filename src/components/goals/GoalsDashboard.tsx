
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { AnimatedValue } from '../ui/AnimatedValue';
import { useGoalsStore } from '../../stores/goalsStore';

export const GoalsDashboard = () => {
  const { getMRRAtual, getProgressoMeta, metaMensal } = useGoalsStore();
  const mrrAtual = getMRRAtual();
  const progresso = getProgressoMeta();
  const faltam = metaMensal - mrrAtual;

  return (
    <motion.div
      className="max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-dark bg-clip-text text-transparent">
            Metas & MRR
          </span>
        </h1>
        <p className="text-xl text-gray-400">
          Acompanhe suas metas de vendas em tempo real
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <GlassCard glow>
          <div className="text-center">
            <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4">
              MRR Atual
            </h3>
            <AnimatedValue
              value={mrrAtual}
              size="lg"
              format="currency"
            />
            <p className="text-green-400 text-sm mt-3">
              +12.5% vs mês anterior
            </p>
          </div>
        </GlassCard>
        
        <GlassCard glow>
          <div className="text-center">
            <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4">
              Meta Mensal
            </h3>
            <AnimatedValue
              value={metaMensal}
              size="lg"
              format="currency"
            />
            <div className="mt-4">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-gold-primary to-gold-light rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progresso, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {progresso.toFixed(1)}% concluído
              </p>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard glow>
          <div className="text-center">
            <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4">
              Faltam
            </h3>
            <AnimatedValue
              value={faltam > 0 ? faltam : 0}
              size="lg"
              format="currency"
            />
            <p className="text-sm text-gray-400 mt-3">
              10 dias úteis restantes
            </p>
          </div>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard>
          <h3 className="text-2xl font-bold mb-6">Evolução do MRR</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <p>Gráfico de evolução em desenvolvimento</p>
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="text-2xl font-bold mb-6">Vendas Recentes</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium">Cliente Exemplo {item}</p>
                  <p className="text-sm text-gray-400">Template TOTVS</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(5000 * item)}
                  </p>
                  <p className="text-xs text-gray-400">mensal</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};
