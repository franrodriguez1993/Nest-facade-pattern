import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports:[ MongooseModule.forFeature([
    {
      name: Users.name,
      schema: UsersSchema,
    },
  ]),
    SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
