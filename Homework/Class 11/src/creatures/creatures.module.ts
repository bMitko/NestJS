import { Module } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creature } from './creature.entity';
import { Habitat } from 'src/habitats/habitat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creature, Habitat])],
  controllers: [CreaturesController],
  providers: [CreaturesService],
})
export class CreaturesModule {}
