import { ApiProperty } from "@nestjs/swagger";

export default class UpdateProcessDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public title: string;

    @ApiProperty()
    public newTitle: string;
}
