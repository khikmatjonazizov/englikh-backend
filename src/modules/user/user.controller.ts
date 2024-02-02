import { Controller, Get, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { endpoints } from '../../endpoints';
import { ListUsersDto } from './dto/list-users.dto';

@Controller(endpoints.users['root'])
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Get(endpoints.users.endpoints['list'])
  getUsers(@Query() queries: ListUsersDto) {

  }
}
