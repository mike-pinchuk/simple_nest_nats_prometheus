import { Module } from '@nestjs/common';
import { MathModule } from './math/math.module';

@Module({
  imports: [MathModule],
  controllers: [],
})
export class AppModule {}
