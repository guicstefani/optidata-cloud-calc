
// Formatação de moeda brasileira
export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor)
}

// Formatação de números
export function formatarNumero(valor) {
  return new Intl.NumberFormat('pt-BR').format(valor)
}

// Formatação de porcentagem
export function formatarPorcentagem(valor) {
  return `${valor.toFixed(1)}%`
}

// Formatação de data
export function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR')
}

// Formatação de data e hora
export function formatarDataHora(data) {
  return new Date(data).toLocaleString('pt-BR')
}

// Abreviação de números grandes
export function abreviarNumero(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Formatação de bytes
export function formatarBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}
