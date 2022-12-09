import { ApiProperty } from "@nestjs/swagger";

export default class ProfileDto {
    @ApiProperty()
    public charity_type: number;

    @ApiProperty()
    public goal: number;

    @ApiProperty()
    public fund_type: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public title: string;

    @ApiProperty()
    public photo: string;

    @ApiProperty()
    public country: string;

    @ApiProperty()
    public location: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public summary: string;

    @ApiProperty()
    public detail: string;

    @ApiProperty()
    public vip: string;

    @ApiProperty()
    public website: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public linkedin: string;

    @ApiProperty()
    public twitter: string;

    @ApiProperty()
    public facebook: string;

    @ApiProperty()
    public instagram: string;

    @ApiProperty()
    public createDateTime: Date;
}
