import { IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class FindOneParams {
  @ApiProperty()
  title: string;
}
