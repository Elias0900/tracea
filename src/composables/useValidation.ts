export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isValidPhone(value: string): boolean {
  const cleaned = value.trim().replace(/[\s.-]/g, '')
  return /^(0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(cleaned)
}

export function isValidPostalCode(value: string): boolean {
  return /^\d{5}$/.test(value.trim())
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 2
}
