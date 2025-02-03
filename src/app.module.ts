import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { SuperheroModule } from './superhero/superhero.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          const config = fs.readFileSync(
            join(__dirname, '../config.yaml'),
            'utf-8',
          );
          return yaml.load(config) as Record<string, any>;
        },
      ],
    }),
    SuperheroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
