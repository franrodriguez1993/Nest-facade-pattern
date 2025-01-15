import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await  this.productsService.create(createProductDto);

    return {statusCode:HttpStatus.CREATED, result:{product}};
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();

    return {statusCode:HttpStatus.OK, result:{products}};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);

    if (!product) throw new NotFoundException()
    
    return {statusCode:HttpStatus.OK, result:{product}};
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.update(id, updateProductDto);

    return {statusCode:HttpStatus.OK, result:{product}};
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

    await this.productsService.remove(id);

    return { statusCode: HttpStatus.OK, result: { message:"Product deleted"}};
  }
}