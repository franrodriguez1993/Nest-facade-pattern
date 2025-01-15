import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductsDocument = Products & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

}

export const ProductsSchema = SchemaFactory.createForClass(Products);