import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './products.schema';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products.name) private productModel: Model<ProductsDocument>) {}

  
  async create(createProductDto: CreateProductDto): Promise<ProductsDocument> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<ProductsDocument[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductsDocument> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductsDocument> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  }
}