import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: 'best-secret-key-of-the-world',
        signOptions: { expiresIn: '5min' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}