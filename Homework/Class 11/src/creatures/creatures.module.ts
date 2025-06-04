import { Module } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creature } from './creature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creature])],
  controllers: [CreaturesController],
  providers: [CreaturesService],
})
export class CreaturesModule {}
