import { Module } from '@nestjs/common';
import { MathController } from './math.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathService } from './math.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4221'],
        },
      },
    ]),
  ],
  controllers: [MathController],
  providers: [MathService],
})
export class MathModule {}
