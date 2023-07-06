import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge, Histogram, Summary } from 'prom-client';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectMetric('counter') public counter: Counter<string>,
    @InjectMetric('gauge') public gauge: Gauge,
    @InjectMetric('histogram') public histogram: Histogram,
    @InjectMetric('summary') public summary: Summary,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    this.counter.inc(1);

    this.gauge.setToCurrentTime();
    const end = this.gauge.startTimer();
    if (res) {
      end();
    }

    const endHistrogram = this.histogram.startTimer();
    endHistrogram();

    const endSummary = this.summary.startTimer();
    endSummary();

    next();
  }
}
