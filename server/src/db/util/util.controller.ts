import { Controller, HttpCode, Post } from '@nestjs/common';
import { UtilService } from './util.service';

@Controller('util')
export class UtilController {
  constructor(private readonly utilService: UtilService) {}

  @HttpCode(200)
  @Post('ping')
  async ping() {
    return this.utilService.ping();
  }
}
