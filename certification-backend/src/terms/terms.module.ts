import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { User } from "./user.entity";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "../guards/auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
