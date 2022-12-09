import { ApiProperty } from "@nestjs/swagger";

export default class LoginDto {
    @ApiProperty()
    public wallet_address: string;
}
