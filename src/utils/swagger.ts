import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: { persistAuthorization: true },
};
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('WHORU API Docs')
    .setDescription('7기 E반 1조 온라인 롤플레잉 추리게임 API Description')
    .setVersion('1.0.0')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
    }, 'access-token',)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}
