import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from "class-validator";

export class HabitatCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Nireva'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Ashara'
    })
    climateType: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Sandy'
    })
    terrain: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: 1
    })
    maxCapacity: number;
}