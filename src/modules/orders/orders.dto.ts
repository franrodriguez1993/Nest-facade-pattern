import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  products:string[]
}


export class CreateOrderServiceDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsArray()
  @IsString({ each: true })
  products:string[]
}