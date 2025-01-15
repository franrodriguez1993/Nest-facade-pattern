import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigModule } from './database/mongo.module';
import { SharedModule } from './modules/shared/shared.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import morganConfig from './config/morgan';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    UsersModule,
    MongoConfigModule,
  SharedModule,
  ProductsModule,
  OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply( morganConfig).forRoutes('*');
  }
}
