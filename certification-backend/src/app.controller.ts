import { Body, Controller, Get, Post, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Login")
@Controller("auth")
export class AppController {
  constructor() {}
  
  // @ApiOperation({
  //   summary: 'Login with metamask sign hash.',
  //   description:
  //     'Returns access token when the login is successful. Otherwise BadRequestException will occur.',
  // })
  // @ApiBody({ type: LoginDto })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  // @Post('login')
  // @SetMetadata('roles', 'login')
  // async login(@Body() logindata: LoginDto)
  // {
  //   const user = await this.authService.login(logindata);
  //   return user;
  // }

}
