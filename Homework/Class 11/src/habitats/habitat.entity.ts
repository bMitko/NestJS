import { ApiProperty } from "@nestjs/swagger";
import { Creature } from "src/creatures/creature.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('habitats')
export class Habitat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        type: String,
        example: 'Erland'
    })
    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    name: string;

    @ApiProperty({
        type: String,
        example: 'Ashara'
    })
    @Column({
        type: 'varchar',
        length: 30,
        name: 'climate_type'
    })
    climateType: string;

    @ApiProperty({
        type: String,
        example: 'Sandy'
    })
    @Column({
        type: 'varchar',
        length: 30
    })
    terrain: string;

    @ApiProperty({
        type: Number,
        example: 1
    })
    @Column({
        type: 'integer',
        name: 'max_capacity'
    })
    maxCapacity: number;

    @OneToMany(() => Creature, (creature) => creature.habitat)
    @ApiProperty({
        type: [Creature],
        description: 'This is the habitat for theese creatures'
    })
    creatures: Creature[];

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

