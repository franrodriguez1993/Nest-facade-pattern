import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Products } from '../products/products.schema';
import { Users } from '../users/users.schema';

export type OrdersDocument = Orders & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Orders {

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  user: Users;

  @Prop({ required: true })
  total: number;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Products' }],
    default: [],
  })
  products: Products[];

}

export const OrdersSchema = SchemaFactory.createForClass(Orders);