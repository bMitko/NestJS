import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/common/types/role.enum";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id: string;

    @ApiProperty({
        type: String,
        example: 'admin@mail.com'
    })
    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    email: string

    @Column()
    password: string;

    @ApiProperty({
        enum: Role,
        example: 'Visitor'
    })
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Visitor
    })
    role: Role;

    @Column({
        type: 'text',
        nullable: true,
        name: 'refresh_token'
    })
    refreshToken: string | null;

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

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePasswords(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password)
    }
}
