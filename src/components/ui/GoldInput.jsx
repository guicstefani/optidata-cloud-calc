
import React from 'react'

export const GoldInput = ({ 
  label, 
  value, 
  onChange, 
  type = 'number',
  suffix = '',
  prefix = '',
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
            {prefix}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`gold-input ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
            {suffix}
          </div>
        )}
      </div>
    </div>
  )
}

export const GoldSelect = ({ label, value, onChange, options, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="gold-input"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-dark-900 text-foreground">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export const GoldButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 font-medium rounded-lg transition-all duration-200'
  
  const variants = {
    primary: 'gold-button',
    secondary: 'neumorph-button text-foreground hover:bg-white/5',
    outline: 'border border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
