import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DangerLevel } from "src/common/types/danger-level.enum";

export class CreatureUpdateDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Name of the creature',
        example: 'Zarnex'
    })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Species of the creature',
        example: 'Velkari'
    })
    species?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Origin planet of the creature',
        example: 'Thalos'
    })
    originPlanet?: string;

    @IsEnum(DangerLevel)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Danger level of the creature',
        example: DangerLevel.Harmless
    })
    dangerLevel?: DangerLevel;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Preffered climate for the creature',
        example: 'Surnox'
    })
    prefferedClimate?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'The ID of the habitat',
        example: 'SOME-HABITAT-ID'
    })
    habitatId: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Image of the creature(URL)',
        example: 'https://imgcdn.stablediffusionweb.com/2024/10/14/f45585ce-a6a5-4a0c-be61-93e841250e9c.jpg'
    })
    imageUrl?: string;
}