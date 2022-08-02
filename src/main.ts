import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setBaseViewsDir(join(__dirname, '../views'));
  app.useStaticAssets(join(__dirname, '../public'));
  app.setViewEngine('hbs');
  setupSwagger(app);
  const PORT = process.env.PORT;
  await app.listen(PORT);
  const logger = new Logger('MAIN');
  logger.log(`The server is on PORT ${PORT}`);
}
bootstrap();
