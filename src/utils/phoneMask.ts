export const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}