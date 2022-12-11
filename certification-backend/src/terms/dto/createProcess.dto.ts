import { ApiProperty } from "@nestjs/swagger";

export default class CreateProcessDto {
    @ApiProperty()
    public title: string;

    @ApiProperty()
    public subjects: string;
}
