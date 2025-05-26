export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const maskCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const maskCPForCNPJ = (value: string): string => {
  const digits = value.replace(/\D/g, "")

  if (digits.length <= 11) {
    return maskCPF(digits)
  } else {
    return maskCNPJ(digits)
  }
}

export const maskPhone = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})/, "$1-$2")
}

export const maskCEP = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1")
}

export const maskCurrency = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".")
}
