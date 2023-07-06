import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MathModule } from './math/math.module';
import {
  PrometheusModule,
  makeCounterProvider,
  makeGaugeProvider,
  makeHistogramProvider,
  makeSummaryProvider,
} from '@willsoto/nestjs-prometheus';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    MathModule,
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
  controllers: [],
  providers: [
    makeCounterProvider({
      name: 'counter',
      help: 'metric_help',
    }),
    makeGaugeProvider({
      name: 'gauge',
      help: 'gauge_help',
    }),
    makeHistogramProvider({
      name: 'histogram',
      help: 'histogram_help',
    }),
    makeSummaryProvider({
      name: 'summary',
      help: 'summary_help',
      percentiles: [0.01, 0.1, 0.9, 0.99],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'math', method: RequestMethod.GET });
  }
}
