
// Preços base da infraestrutura
export const PRECOS_BASE = {
  // Compute
  vcpuHora: 0.0347,        // R$ por hora
  horasMes: 720,           // 24h × 30 dias
  
  // Memória
  ramHoraGB: 0.0278,       // R$ por GB por hora
  
  // Armazenamento
  storageFCM_GB: 0.75,     // R$ por GB/mês
  storageSSD_GB: 0.55,     // R$ por GB/mês
  
  // Serviços
  monitoramento: 100.00,   // R$ fixo por VM
  ipAdicional: 70.00,      // R$ por IP
  
  // Backup
  backupPadrao: 0.30,      // 30% do storage
  backupDuplo: 0.60,       // 60% do storage
  backupTriplo: 0.90       // 90% do storage
}

// Licenças disponíveis
export const LICENCAS = {
  so: {
    'windows-server-datacenter': {
      nome: 'Windows Server Datacenter',
      calculo: (vcpu) => vcpu <= 8 ? 850 : 850 + ((vcpu - 8) * 106.25)
    },
    'windows-server-standard': {
      nome: 'Windows Server Standard',
      calculo: (vcpu) => vcpu <= 16 ? 220 : 220 + ((vcpu - 16) * 13.75)
    },
    'rhel': { nome: 'Red Hat Enterprise Linux', preco: 100.00 },
    'ubuntu': { nome: 'Ubuntu Server', preco: 0 },
    'centos': { nome: 'CentOS', preco: 0 }
  },
  
  database: {
    'sql-server-enterprise': {
      nome: 'SQL Server Enterprise',
      calculo: (vcpu) => vcpu * 550
    },
    'sql-server-standard': {
      nome: 'SQL Server Standard',
      calculo: (vcpu) => vcpu * 180
    },
    'postgresql': { nome: 'PostgreSQL', preco: 0 },
    'mysql': { nome: 'MySQL Community', preco: 0 }
  },
  
  antivirus: { preco: 55.00 }
}

// Função principal de cálculo
export function calcularVM(config) {
  const custos = {
    compute: 0,
    memoria: 0,
    armazenamento: 0,
    backup: 0,
    monitoramento: 0,
    licencas: 0,
    total: 0
  }
  
  // 1. COMPUTE (vCPU)
  custos.compute = config.vcpu * PRECOS_BASE.vcpuHora * PRECOS_BASE.horasMes
  
  // 2. MEMÓRIA (RAM)
  custos.memoria = config.ramGB * PRECOS_BASE.ramHoraGB * PRECOS_BASE.horasMes
  
  // 3. ARMAZENAMENTO
  custos.armazenamento = 
    (config.storageFCM * PRECOS_BASE.storageFCM_GB) +
    (config.storageSSD * PRECOS_BASE.storageSSD_GB)
  
  // 4. BACKUP
  const storageTotal = config.storageFCM + config.storageSSD
  switch(config.tipoBackup) {
    case 'padrao':
      custos.backup = storageTotal * PRECOS_BASE.backupPadrao
      break
    case 'duplo':
      custos.backup = storageTotal * PRECOS_BASE.backupDuplo
      break
    case 'triplo':
      custos.backup = storageTotal * PRECOS_BASE.backupTriplo
      break
    default:
      custos.backup = 0
  }
  
  // 5. MONITORAMENTO
  if (config.monitoramento) {
    custos.monitoramento = PRECOS_BASE.monitoramento
  }
  
  // 6. LICENÇAS
  custos.licencas = calcularLicencas(config)
  
  // TOTAL
  custos.total = Object.values(custos).reduce((sum, val) => sum + val, 0)
  
  return custos
}

// Cálculo de licenças
export function calcularLicencas(config) {
  let totalLicencas = 0
  
  // Sistema Operacional
  if (config.so && LICENCAS.so[config.so]) {
    const licencaSO = LICENCAS.so[config.so]
    if (licencaSO.calculo) {
      totalLicencas += licencaSO.calculo(config.vcpu)
    } else {
      totalLicencas += licencaSO.preco || 0
    }
  }
  
  // Banco de Dados
  if (config.database && LICENCAS.database[config.database]) {
    const licencaDB = LICENCAS.database[config.database]
    if (licencaDB.calculo) {
      totalLicencas += licencaDB.calculo(config.vcpu)
    } else {
      totalLicencas += licencaDB.preco || 0
    }
  }
  
  // Antivírus
  if (config.antivirus) {
    totalLicencas += LICENCAS.antivirus.preco
  }
  
  // IPs Adicionais
  if (config.ipsAdicionais > 0) {
    totalLicencas += config.ipsAdicionais * PRECOS_BASE.ipAdicional
  }
  
  return arredondar(totalLicencas)
}

// Arredondamento preciso para 2 casas decimais
export function arredondar(valor) {
  return Math.round(valor * 100) / 100
}

// Templates prontos
export const TEMPLATES = {
  totvs: {
    nome: "TOTVS Protheus - Produção",
    descricao: "Configuração otimizada para ambiente de produção Protheus 12",
    categoria: "ERP",
    config: {
      vcpu: 8,
      ramGB: 32,
      storageFCM: 0,
      storageSSD: 500,
      so: 'windows-server-standard',
      database: 'sql-server-standard',
      monitoramento: true,
      tipoBackup: 'duplo',
      antivirus: true,
      ipsAdicionais: 0
    }
  },
  senior: {
    nome: "Senior HCM - Alta Disponibilidade",
    descricao: "Ambiente HA para gestão de RH com até 5.000 funcionários",
    categoria: "HCM",
    config: {
      vcpu: 12,
      ramGB: 48,
      storageFCM: 0,
      storageSSD: 1000,
      so: 'windows-server-datacenter',
      database: 'sql-server-enterprise',
      monitoramento: true,
      tipoBackup: 'triplo',
      antivirus: true,
      ipsAdicionais: 1
    }
  },
  custom: {
    nome: "Configuração Básica",
    descricao: "Template inicial para customização",
    categoria: "Personalizado",
    config: {
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
  }
}
