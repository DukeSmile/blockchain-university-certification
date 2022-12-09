import { ApiProperty } from "@nestjs/swagger";

export default class CreateUserDto {
    @ApiProperty()
    public title: string;

    @ApiProperty()
    public subjects: string;
}
