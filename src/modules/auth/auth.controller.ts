import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoiginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }


  @ApiOperation({ summary: "Royhatdan o'tish !" })
  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload)
  }


  @ApiOperation({ summary: 'login qilish !' })
  @Post('login')
  login(@Body() payload: LoiginDto) {
    return this.authService.login(payload)
  }
}
