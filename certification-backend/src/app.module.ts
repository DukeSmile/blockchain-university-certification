import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { TermsModule } from './terms/terms.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TermsModule
  ],
  controllers: [],
  providers: [ JwtService],
})
export class AppModule { }