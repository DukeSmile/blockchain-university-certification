import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post, Get, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import CreateUserDto from './dto/createUser.dto';
import FindOneParams from '../utils/findOneParams';
import { AuthGuard } from '../guards/auth.guard';

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { };

  @Get('all')
  @ApiOperation({ summary: "Get all Users" })
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  @SetMetadata('roles', 'guest')
  async getAll() {
    // console.log("Getting all users");
    return await this.usersService.getAllUsers();
    // return await this.mailService.sendMail(email, name);
  }

  @Post("create")
  @ApiOperation({ summary: "Create user" })
  @SetMetadata('roles', 'guest')
  async register(@Body() registrationData: CreateUserDto) {
    console.log("Creating charity");
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          "User with that wallet_address already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch("")
  @SetMetadata('roles', 'user')
  async updatePost(
    @Body() updateData: CreateUserDto
  ) {
    return this.usersService.update(updateData);
  }

  @Delete(":address")
  @SetMetadata('roles', 'user')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete task" })
  async deleteTask(@Param() { address }: FindOneParams) {
    // return true;
    return this.usersService.deleteUser(address);
  }
}
