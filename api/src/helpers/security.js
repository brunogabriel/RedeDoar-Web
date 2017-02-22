import bcrypt from 'bcrypt-nodejs'

export const generateBcrypt = (value) => {
  const SALT_WORK_FACTOR = 10
  let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
  let hash = bcrypt.hashSync(value, salt)
  if (!hash) throw new Error(__('Erro ao gerar hash'))
  return hash
}

export const comparePassword = (value1, value2) => {
  return bcrypt.compareSync(value1, value2)
}
