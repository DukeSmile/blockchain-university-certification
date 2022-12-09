import { Module } from "@nestjs/common";
import { TermsService } from "./terms.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TermsController } from "./terms.controller";
import { Terms } from "./terms.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Terms])],
  providers: [
    TermsService
  ],
  exports: [TermsService],
  controllers: [TermsController],
})
export class TermsModule {}
