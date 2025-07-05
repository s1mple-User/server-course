import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import serverlessExpress from '@vendia/serverless-express';

let server: any;

async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.init();
  return serverlessExpress({ app: expressApp });
}

export const handler = async (...args: any[]) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(...args);
};
