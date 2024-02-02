import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { ZodValidationPipe } from 'nestjs-zod'
import * as cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      credentials: true,
      origin: '*',
    }),
  );
  app.useGlobalPipes(new ZodValidationPipe());
  await app.listen(process.env.BACKEND_PORT as string);
}
bootstrap();
