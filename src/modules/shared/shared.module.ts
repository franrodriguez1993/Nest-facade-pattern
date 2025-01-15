import { Module } from '@nestjs/common';
import { UtilService } from './util.service';


@Module({
  imports:[],
  exports: [UtilService],
  providers: [UtilService],
})
export class SharedModule {}
