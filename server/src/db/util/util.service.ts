import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  async ping() {
    return true;
  }
}
