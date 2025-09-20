import * as bcrypt from 'bcrypt';

export const compirePass = async (pass: string, shifPass: string) => {
  return bcrypt.compare(pass, shifPass)
}
