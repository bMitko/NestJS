import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";

export class HabitatUpdateDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: 'Nireva'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        type: String,
        example: 'Ashara'
    })
    climateType: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        type: String,
        example: 'Sandy'
    })
    terrain: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 1
    })
    maxCapacity: number;
}