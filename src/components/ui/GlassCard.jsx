
import React from 'react'

export const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`glass-card ${className}`} {...props}>
      {children}
    </div>
  )
}

export const MetricCard = ({ title, value, subtitle, icon: Icon, trend, className = '' }) => {
  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="flex-shrink-0 p-3 bg-gold-500/10 rounded-lg">
            <Icon className="w-6 h-6 text-gold-400" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className={`text-sm flex items-center ${
            trend.positive ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend.value}
            <span className="ml-1 text-muted-foreground">vs mês anterior</span>
          </div>
        </div>
      )}
    </GlassCard>
  )
}
