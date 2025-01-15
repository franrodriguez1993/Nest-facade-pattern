import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersDocument } from './users.schema';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { ModuleRef } from '@nestjs/core';
import { UtilService } from '../shared/util.service';

@ApiTags("users")
@Controller('users')
export class UsersController {
  private utilService: UtilService;
  constructor(private readonly usersService: UsersService,  private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.utilService = this.moduleRef.get(UtilService,{strict:false} )
  }

  @Post("/register")
  @ApiOperation({ summary: 'Register new user' })
 async register(@Body() data: CreateUserDto) {
  // check parameters
  const checkUsername = await this.usersService.findByUsername(data.username);
  const checkEmail = await this.usersService.findByEmail(data.email);
  if (checkUsername || checkEmail) throw new BadRequestException("Invalid parameters");
    
  // hash password
    const hash = await this.utilService.encrypt(data.password)
    data.password = hash;

  // register
    const user:UsersDocument = await this.usersService.create(data);
    delete user.password;

    return {statusCode:HttpStatus.CREATED, result:{user}};
  }


  @Post("/login")
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() data: LoginUserDto) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) throw new BadRequestException("Invalid credentials");

    const comparePass = await this.utilService.compare(data.password, user.password);
    if (!comparePass) throw new BadRequestException("Invalid credentials");
    
    delete user.password;

    return {statusCode:HttpStatus.OK, result:{user}};
  }

  @Get()
  async findAll() {
    const response = await this.usersService.findAll();

    return { statusCode:200, result:response};
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    
    const response = await this.usersService.findById(id);
    
    return { statusCode:200, result:response};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    const response = await  this.usersService.remove(id);
    return { statusCode:200, result:response};
  }
}
