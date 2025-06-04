import { Controller, Post, Get, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatureCreateDto } from './dto/creature-create.dto';
import { Body } from '@nestjs/common';
import { CreatureUpdateDto } from './dto/creture-update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/role.enum';

@ApiTags('Creatures')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Zookeeper)
  @ApiOperation({summary: 'Create new creature'})
  @ApiBody({type: CreatureCreateDto})
  @ApiCreatedResponse({description: 'The creature has been created'})
  @ApiBadRequestResponse({description: 'Bad request'})
  create(@Body() creatureCreateDto: CreatureCreateDto) {
    return this.creaturesService.create(creatureCreateDto);
  }

  @Get()
  @ApiOperation({summary: 'Search creatures'})
  @ApiOkResponse({description: 'List of searched creatures'})
  search() {
    return this.creaturesService.search();
  }

  @Get('/:id')
  @ApiOperation({summary: 'Get creature by id'})
  @ApiOkResponse({description: 'The creature was successfully found.'})
  @ApiNotFoundResponse({description: `Creature with this ID doesn't exist`})
  findOne(@Param('id') id:string) {
    return this.creaturesService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Zookeeper)
  @ApiOperation({summary: 'Update creature by id'})
  @ApiBody({type: CreatureUpdateDto})
  @ApiOkResponse({description: 'The creature was updated'})
  @ApiNotFoundResponse({description: `Creature with this ID doesn't exist`})
  @ApiBadRequestResponse({description: 'Bad request'})
  update(@Param('id') id: string, @Body() creatureUpdateDto: CreatureUpdateDto) {
    return this.creaturesService.update(id, creatureUpdateDto)
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Zookeeper)
  @ApiOperation({summary: 'Soft delete a creature'})
  @ApiParam({
    name: 'id', 
    description: 'Creature ID'
  })
  @ApiNotFoundResponse({description: 'Creature soft deleted successfully'})
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.creaturesService.delete(id)
  }
}
