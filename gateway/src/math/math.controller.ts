import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { QueryDto } from './dto/query.dto';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private mathService: MathService) {}

  @Get()
  async getCylinderArea(@Query() query: QueryDto): Promise<Observable<number>> {
    const { radius, height } = query;
    return this.mathService.getCylinderArea(radius, height);
  }
}
