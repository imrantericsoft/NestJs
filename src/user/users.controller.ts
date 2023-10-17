import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("/addUser")
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get("/getAllUser")
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('getUser/:id')
  async findOne(@Param('id') id: string): Promise<User | string> {
    return this.usersService.findOne(+id);
  }

  @Put('editUser/:id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(+id, user);
  }

  @Delete('delete/:id')
  async remove(@Param() params): Promise<string> {
    return this.usersService.remove(params.id);
  }
}
