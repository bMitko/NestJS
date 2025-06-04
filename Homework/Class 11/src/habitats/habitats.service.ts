import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Habitat } from './habitat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitatCreateDto } from './dto/habitat-create.dto';
import { HabitatUpdateDto } from './dto/habitat-update.dto';

@Injectable()
export class HabitatsService {
    constructor(
        @InjectRepository(Habitat)
        private readonly habitatRepository: Repository<Habitat>
    ) { }

    async create(habitatCreateDto: HabitatCreateDto): Promise<Habitat> {
        const habitat = this.habitatRepository.create(habitatCreateDto);

        return await this.habitatRepository.save(habitat)
    }

    async search() {
        return await this.habitatRepository.find()
    }

    async findOne(id: string): Promise<Habitat> {
        const habitat = await this.habitatRepository.findOne({
            where: { id },
            relations: ['creatures'],
        });

        if (!habitat) {
            throw new NotFoundException(`Habitat with ID: ${id} doesn't exist`)
        }

        return habitat;
    }

    async update(id: string, body: HabitatUpdateDto): Promise<Habitat> {

        const updatedHabitat = await this.findOne(id);

        Object.assign(updatedHabitat, body);

        await this.habitatRepository.save(updatedHabitat);

        return updatedHabitat;
    }

    async delete(id: string): Promise<void> {
        const deletedHabitat = await this.findOne(id);

        if(!deletedHabitat) {
            throw new BadRequestException (`You can't delete habitat that doesn't exist`)
        }

        await this.habitatRepository.softDelete(id)
    }
}
