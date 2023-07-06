import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  async cylinderArea(radius: number, height: number): Promise<number> {
    return 2 * 3.14 * radius * height;
  }
}
