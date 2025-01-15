import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class UtilService{

  async encrypt(pass: string) {
    return await bcrypt.hash(pass, 10);
  }

  async compare(pass: string, hash: string) {
    return await bcrypt.compare(pass, hash);
  }
}