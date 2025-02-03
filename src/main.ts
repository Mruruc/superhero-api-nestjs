import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('application.port') || 3000;
  const appName = configService.get<string>('application.name');
  const apiVersion = configService.get<string>('application.api_version') || '/';

  app.setGlobalPrefix(apiVersion);
  await app.listen(port);

  Logger.log(`Starting ${appName} on port ${port}...`,"APPLICATION");
}
bootstrap();
