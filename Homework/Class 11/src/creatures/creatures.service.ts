import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Creature } from './creature.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatureCreateDto } from './dto/creature-create.dto';
import { CreatureUpdateDto } from './dto/creture-update.dto';
import { Habitat } from 'src/habitats/habitat.entity';

@Injectable()
export class CreaturesService {
    constructor(
        @InjectRepository(Creature)
        private readonly creatureRepository: Repository<Creature>,
        @InjectRepository(Habitat)
        private readonly habitatRepository: Repository<Habitat>
    ) { }

    async create(creatureCreateDto: CreatureCreateDto): Promise<Creature> {
        const creature = this.creatureRepository.create(creatureCreateDto)

        const habitat = await this.habitatRepository.findOne({
            where: { id: creatureCreateDto.habitatId }, 
            relations: ['creatures']})

        if (!habitat) {
            throw new BadRequestException (`Habitat with ID: ${creatureCreateDto.habitatId} doesn't exist.`)
        }

        if (habitat.creatures.length >= habitat.maxCapacity) {
            throw new BadRequestException (`This habitat is aleady full. Try another one.`)
        }

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
        const creature = await this.findOne(id);

        const habitat = await this.habitatRepository.findOne({
            where: { id: body.habitatId }, 
            relations: ['creatures']})

        if (!habitat) {
            throw new BadRequestException (`Habitat with ID: ${body.habitatId} doesn't exist.`)
        }

        if (habitat.creatures.length >= habitat.maxCapacity ) {
            throw new BadRequestException (`This habitat is aleady full. Try another one.`)
        }

        Object.assign(creature, body);

        await this.creatureRepository.save(creature);

        const updatedCreature = await this.findOne(id);

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
