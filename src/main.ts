import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
app.enableCors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  const PORT =  3000;
  await app.listen(PORT);
  console.log(`App running on port ${PORT}`);
}
bootstrap();
