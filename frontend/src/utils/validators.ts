export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidCPF = (cpf: string): boolean => {
  const cpfClean = cpf.replace(/[^\d]/g, "")

  if (cpfClean.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpfClean)) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpfClean.charAt(i)) * (10 - i)
  }

  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder

  if (Number.parseInt(cpfClean.charAt(9)) !== digit1) return false

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpfClean.charAt(i)) * (11 - i)
  }

  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder

  return Number.parseInt(cpfClean.charAt(10)) === digit2
}

export const isValidCNPJ = (cnpj: string): boolean => {
  const cnpjClean = cnpj.replace(/[^\d]/g, "")

  if (cnpjClean.length !== 14) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpjClean)) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  let weight = 5

  for (let i = 0; i < 12; i++) {
    sum += Number.parseInt(cnpjClean.charAt(i)) * weight
    weight = weight === 2 ? 9 : weight - 1
  }

  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder

  if (Number.parseInt(cnpjClean.charAt(12)) !== digit1) return false

  // Validação do segundo dígito verificador
  sum = 0
  weight = 6

  for (let i = 0; i < 13; i++) {
    sum += Number.parseInt(cnpjClean.charAt(i)) * weight
    weight = weight === 2 ? 9 : weight - 1
  }

  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder

  return Number.parseInt(cnpjClean.charAt(13)) === digit2
}

export const isValidCPForCNPJ = (value: string): boolean => {
  const clean = value.replace(/[^\d]/g, "")

  if (clean.length === 11) {
    return isValidCPF(clean)
  } else if (clean.length === 14) {
    return isValidCNPJ(clean)
  }

  return false
}
