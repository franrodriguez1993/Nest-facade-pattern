import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { ProductsService } from "../products/products.service";
import { UsersService } from "../users/users.service";
import { ModuleRef } from "@nestjs/core";
import { CreateOrderDto } from "./orders.dto";
import {  ProductsDocument } from "../products/products.schema";
import { OrdersDocument } from "./orders.schema";
import { UsersDocument } from "../users/users.schema";

@Injectable()
export class OrdersFacade {
  private  ordersService: OrdersService;
  private  productsService: ProductsService;
  private  usersService: UsersService;

  constructor(private readonly moduleRef: ModuleRef) {
  }

  onModuleInit() {
    this.ordersService = this.moduleRef.get(OrdersService, { strict: false });
    this.productsService = this.moduleRef.get(ProductsService, { strict: false });
    this.usersService = this.moduleRef.get(UsersService, { strict: false });
  }


 async createOrder(dto: CreateOrderDto):Promise<OrdersDocument> {
    //check user 
  const user = await this.checkUser(dto.user);
   
   //check products
   const { products, availableProducts } = await this.checkProducts(dto.products);

   //get total
   const total = this.getTotalPrice(products);

   // create order
   const order = await this.ordersService.create({ user: dto.user, products: availableProducts, total });
   if (order) {
     order.user = user;
     order.products = products;
   }
   return order;

  }

  /*  UTILS */

  async checkProducts(productIds: string[]):
    Promise<{
    products: ProductsDocument[],
    availableProducts: string[]
  }> {
    
   const products: ProductsDocument[] = [];
   const availableProducts: string[] = [];

    for await (let id of productIds) {
      const prod = await this.productsService.findOne(id);
      if (prod) {
        availableProducts.push(id);
        products.push(prod);
      }
   }
   
    if (products.length === 0) throw new BadRequestException("Order has no available products");
    
   return {products,availableProducts}

  }

  getTotalPrice(products: ProductsDocument[]):number {
    let total = 0;

    products.forEach(product => {
      total += product.price;
    });
    return total;
  }

  async checkUser(userId:string):Promise<UsersDocument> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

}