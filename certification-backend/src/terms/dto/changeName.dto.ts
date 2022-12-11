import { ApiProperty } from "@nestjs/swagger";

export default class ChangeNameDto {
    @ApiProperty()
    public title: string;

    @ApiProperty()
    public newTitle: string;
}
