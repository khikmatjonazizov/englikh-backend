import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { UserLoginResponse, UserSignupResponse } from 'englikh-contracts';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import { AlreadyExistsException, LoginException } from '../../exceptions';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
  }

  async login(dto: LoginDto): Promise<UserLoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new LoginException();
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new LoginException();

    const token = await this.signToken(user.id, user.email);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  }

  async signup(dto: SignupDto): Promise<UserSignupResponse | undefined> {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          first_name: dto.firstName,
          last_name: dto.lastName,
          hash,
        },
      });
      const token = await this.signToken(user.id, user.email);

      return {
        accessToken: token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new AlreadyExistsException('User');
        }
      }
    }
  }

  signToken(userId: number, email: string): Promise<string> {
    const data = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET') as string;

    return this.jwt.signAsync(data, { secret, expiresIn: '15m' });
  }
}
