import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { username, password } = registerDto;

    const existingUser = await this.usersModel.findOne({ 
      where: { username } 
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    this.usersModel.create({ 
      username, 
      password: hashedPassword 
    });
    
    return { message: 'Register Successfully'}
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;

    const user = await this.usersModel.findOne({ where: { username } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
