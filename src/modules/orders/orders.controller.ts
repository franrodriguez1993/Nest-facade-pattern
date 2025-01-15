import { Controller, Get, Post, Body, Param, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersFacade } from './orders.facade';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './orders.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService, private readonly ordersFacade: OrdersFacade) { }

  @Post()
 async create(@Body() createOrderDto: CreateOrderDto) {
    const order =  await this.ordersFacade.createOrder(createOrderDto);

    return {statusCode:HttpStatus.CREATED, result:{order}};
  }


  @Get(':id')
 async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);
    
    if (!order) throw new NotFoundException('Order not found');

    return {statusCode:HttpStatus.OK, result:{order}};
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
