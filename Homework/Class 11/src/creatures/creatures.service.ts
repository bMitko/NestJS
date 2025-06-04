import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Creature } from './creature.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatureCreateDto } from './dto/creature-create.dto';
import { CreatureUpdateDto } from './dto/creture-update.dto';

@Injectable()
export class CreaturesService {
    constructor(
        @InjectRepository(Creature)
        private readonly creatureRepository: Repository<Creature>
    ) { }

    async create(creatureCreateDto: CreatureCreateDto): Promise<Creature> {
        const creature = this.creatureRepository.create(creatureCreateDto)

        return await this.creatureRepository.save(creature)
    }

    async search() {
        return await this.creatureRepository.find()
    }

    async findOne(id: string): Promise<Creature> {
        const creature = await this.creatureRepository.findOneBy({ id })

        if (!creature) {
            throw new NotFoundException(`Creature with ID: ${id} doesn't exist`)
        }

        return creature;
    }

    async update(id: string, body: CreatureUpdateDto): Promise<Creature> {

        const updatedCreature = await this.findOne(id);

        Object.assign(updatedCreature, body);

        await this.creatureRepository.save(updatedCreature);

        return updatedCreature;
    }

    async delete(id: string): Promise<void> {
        const deletedCreature = await this.findOne(id);

        if (!deletedCreature) {
            throw new BadRequestException(`You can't delete creature that doesn't exist`)
        }

        await this.creatureRepository.softDelete(id)
    }
}
