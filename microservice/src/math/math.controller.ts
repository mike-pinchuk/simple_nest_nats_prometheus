import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MathService } from './math.service';
import { CylinderArea } from './dto/cylinder_aread.dto';

@Controller('math')
export class MathController {
  constructor(private mathService: MathService) {}

  @MessagePattern('math')
  async cylinderArea(data: CylinderArea): Promise<number> {
    return this.mathService.cylinderArea(data.radius, data.height);
  }
}
