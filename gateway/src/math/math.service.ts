import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class MathService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  async getCylinderArea(
    radius: number,
    height: number,
  ): Promise<Observable<number>> {
    return this.client.send('math', { radius, height });
  }
}
