import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post, Get, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TermsService } from './terms.service';
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import CreateProcessDto from './dto/createProcess.dto';
import FindOneParams from '../utils/findOneParams';
@ApiTags("Terms")
@Controller("terms")
export class TermsController {
  constructor(private readonly TermsService: TermsService) { };

  @Get('all')
  @ApiOperation({ summary: "Get all processes" })
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  async getAll() {
    return await this.TermsService.getAllUsers();
  }

  @Post("create")
  @ApiOperation({ summary: "Create a process" })
  async register(@Body() registrationData: CreateProcessDto) {
    try {
      const newTerm = await this.TermsService.create({
        ...registrationData,
      });
      return newTerm;
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
  @ApiOperation({ summary: "Update a term" })
  async updatePost(
    @Body() updateData: CreateProcessDto
  ) {
    return this.TermsService.update(updateData);
  }

  @Delete(":title")
  @ApiOperation({ summary: "Delete a term" })
  async deleteTask(@Param() { title }: FindOneParams) {
    // return true;
    return this.TermsService.deleteTerm(title);
  }
}
