import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Did you expect a title?')
    .setDescription('API description')
    .setVersion('0.1')
    .addTag('')
    .addBasicAuth(
      {
        type: 'apiKey',
        in: 'header',
        name: 'X-Auth-Token',
        'x-tokenName': 'X-Auth-Token',
      },
      'X-Auth-Token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
