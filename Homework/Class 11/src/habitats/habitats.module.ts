import { Module } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { HabitatsController } from './habitats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitat } from './habitat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitat])],
  controllers: [HabitatsController],
  providers: [HabitatsService],
})
export class HabitatsModule {}
