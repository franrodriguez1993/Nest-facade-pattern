import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products, ProductsSchema } from './products.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Products.name, schema: ProductsSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }