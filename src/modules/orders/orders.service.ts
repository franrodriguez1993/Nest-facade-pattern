import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orders, OrdersDocument } from './orders.schema';
import { Model } from 'mongoose';
import { CreateOrderServiceDto } from './orders.dto';

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Orders.name) private productModel: Model<OrdersDocument>) { }
  
  create(createOrderDto: CreateOrderServiceDto) {
    return this.productModel.create(createOrderDto);
  }

  findOne(id: string) {
    return this.productModel.findById(id).populate({path:'user',model:'Users'}).populate({path:'products',model:'Products'});
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
