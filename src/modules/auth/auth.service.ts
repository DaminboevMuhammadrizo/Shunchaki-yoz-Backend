import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compirePass } from 'src/common/config/bcrypt/compirePass';
import { hashPass } from 'src/common/config/bcrypt/hashPass';
import { JwtPayload } from 'src/common/types/interfaces';
import { PrismaService } from 'src/Database/prisma.service';
import { LoiginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

  private async generateToken(payload: JwtPayload, AccsesTokenOnly = false) {
    const accessToken = await this.jwtService.signAsync(payload)
    if (AccsesTokenOnly) return { accessToken }

    const refreshToken = await this.jwtService.signAsync({ id: payload.id })
    return { accessToken, refreshToken }
  }


  async register(payload: RegisterDto) {
    const user = await this.prisma.users.findUnique({ where: { username: payload.username } })

    if (user) {
      throw new ConflictException({ success: false, message: 'this is username alredy exsists !' })
    }

    const hashPassword = await hashPass(payload.password)
    const newUser = await this.prisma.users.create({ data: { ...payload, password: hashPassword } })
    return this.generateToken({ id: newUser.id, role: newUser.role })
  }


  async login(payload: LoiginDto) {
    const user = await this.prisma.users.findUnique({ where: { username: payload.username } })

    if (!user) {
      throw new ForbiddenException({ success: false, message: 'Invalide username or password !' })
    }

    const deshifPass = await compirePass(payload.password, user.password)

    if (!deshifPass) {
      throw new ForbiddenException({ success: false, message: 'Invalide username or password !' })
    }

    return this.generateToken({ id: user.id, role: user.role })
  }
}
