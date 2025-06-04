import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DangerLevel } from "src/common/types/danger-level.enum";
import { Habitat } from "src/habitats/habitat.entity";

@Entity('creatures')
export class Creature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        type: String,
        example: 'Zarnex'
    })
    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    name: string;

    @ApiProperty({
        type: String,
        example: 'Velkari'
    })
    @Column({
        type: 'varchar',
        length: 30
    })
    species: string;

    @ApiProperty({
        type: String,
        example: 'Thalos'
    })
    @Column({
        type: 'varchar',
        length: 30,
        name: 'origin_planet'
    })
    originPlanet: string;

    @ApiProperty({
        enum: DangerLevel,
        example: 'Harmless'
    })
    @Column({
        type: 'enum',
        enum: DangerLevel,
        name: 'danger_level'
    })
    dangerLevel: DangerLevel;

    @ApiProperty({
        type: String,
        example: 'Surnox'
    })
    @Column({
        type: 'varchar',
        length: 30,
        name: 'preferred_climate'
    })
    prefferedClimate: string;

    @Column({ name: 'habitat_id' })
    habitatId: string;

    @ManyToOne(
        () => Habitat, (habitat) => habitat.creatures, { nullable: false})
    @JoinColumn({
        name: 'habitat_id'
    })
    @ApiProperty({
        type: Habitat,
        description: `The creature's habitat`
    })
    habitat: Habitat;

    @ApiProperty({
        type: String,
        example: 'https://imgcdn.stablediffusionweb.com/2024/10/14/f45585ce-a6a5-4a0c-be61-93e841250e9c.jpg',
        nullable: true
    })
    @Column({
        type: 'text',
        name: 'image_url',
        nullable: true
    })
    imageUrl: string | null;

    @ApiProperty({
        type: String,
        example: '2025-01-20T15:00:00Z'
    })
    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @ApiProperty({
        type: String,
        example: '2025-01-20T15:00:00Z'
    })
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at'
    })
    deletedAt: Date;
}
