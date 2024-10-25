import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../models/user.model';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('quantity') quantity: number = -1,
    @Query('sort') sort: string = 'none',
    @Query('order') order: number = 1,
    @Query('status') status?: string,
    @Query('strict') strict: number = 0,
    @Query('search') search?: string,
  ): Promise<User[] | { error: string }> {
    try {
      return await this.usersService.findUsers({ quantity, sort, order, status, strict, search });
    } catch (error) {
      return { error: error.message };
    }
  }
}
