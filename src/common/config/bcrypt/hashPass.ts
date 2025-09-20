import * as bcrypt from 'bcrypt';

const SALT = 10
export const hashPass = async (pass: string) => {
  return bcrypt.hash(pass, SALT)
}
