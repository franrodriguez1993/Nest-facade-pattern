import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from './orders.schema';
import { OrdersFacade } from './orders.facade';

@Module({
  imports: [MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersFacade],
})
export class OrdersModule {}
