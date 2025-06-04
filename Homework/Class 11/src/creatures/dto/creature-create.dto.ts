import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DangerLevel } from "src/common/types/danger-level.enum";

export class CreatureCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Zarnex'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Velkari'
    })
    species: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Thalos'
    })
    originPlanet: string;

    @IsEnum(DangerLevel)
    @ApiProperty({
        enum: DangerLevel,
        example: DangerLevel.Harmless
    })
    dangerLevel: DangerLevel;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Surnox'
    })
    prefferedClimate: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'SOME-HABITAT-ID'
    })
    habitatId: string;

    @IsString()
    @IsNotEmpty() 
    @IsOptional()
    @ApiProperty({
        type: String,
        example: 'https://imgcdn.stablediffusionweb.com/2024/10/14/f45585ce-a6a5-4a0c-be61-93e841250e9c.jpg'
    })
    imageUrl: string | null;
}