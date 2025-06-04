import { ApiProperty } from "@nestjs/swagger";

export class LoginTokenPairDto {
    @ApiProperty({
        description: 'Access token',
        example: 'your-access-token'
    })
    accessToken: string;

    @ApiProperty({
        description: 'Refresh token',
        example: 'your-refresh-token'
    })
    refreshToken: string;
}