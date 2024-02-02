import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginResponse, UserSignupResponse } from 'englikh-contracts';

import { AuthService } from './auth.service';
import { endpoints } from '../../endpoints';
import { LoginDto, SignupDto } from './dto';

@Controller(endpoints.auth['root'])
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(endpoints.auth.endpoints['login'])
  login(@Body() dto: LoginDto): Promise<UserLoginResponse> {
    return this.authService.login(dto);
  }

  @Post(endpoints.auth.endpoints['signup'])
   signup(@Body() dto: SignupDto): Promise<UserSignupResponse | undefined> {
    return this.authService.signup(dto);
  }
}
