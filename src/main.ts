import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

try {
  config();
  console.log("Loaded .env file successfully");
} catch (error) {
  console.log("Error while loading .env file: ", error);
}

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
