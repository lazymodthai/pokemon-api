import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './auth/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'pokemon1234',
        database: 'pokemon_db',
        models: [Users],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule, PokemonModule
  ]
})

export class DatabaseModule {}