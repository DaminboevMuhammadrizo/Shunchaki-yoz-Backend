import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserRole } from 'src/common/types/enums';
import { Roles } from 'src/core/decorators/roles';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userSevice: UsersService) { }

  @ApiOperation({ summary: 'Hamma userni korish !' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPER)
  @Get('all')
  getAll() {
    return this.userSevice.getAll()
  }

  @ApiOperation({ summary: 'Bita userni korish !' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPER)
  @Get('one/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userSevice.getOne(id)
  }
}
