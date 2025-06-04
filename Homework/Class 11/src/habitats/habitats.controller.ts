import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { HabitatCreateDto } from './dto/habitat-create.dto';
import { HabitatUpdateDto } from './dto/habitat-update.dto';

@ApiTags('Habitats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Zookeeper)
  @ApiOperation({ summary: 'Create new habitat' })
  @ApiBody({ type: HabitatCreateDto })
  @ApiCreatedResponse({description: 'The habitat has been created'})
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() habitatCreateDto: HabitatCreateDto) {
    return this.habitatsService.create(habitatCreateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search habitats' })
  @ApiOkResponse({description: 'List of searched habitats'})
  search() {
    return this.habitatsService.search();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get habitat by id' })
  @ApiOkResponse({description: 'The habitat was successfully found.'})
  @ApiNotFoundResponse({ description: `Habitat with this ID doesn't exist` })
  findOne(@Param('id') id: string) {
    return this.habitatsService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Zookeeper)
  @ApiOperation({ summary: 'Update habitat by id' })
  @ApiBody({ type: HabitatUpdateDto })
  @ApiOkResponse({description: 'The habitat was updated',})
  @ApiNotFoundResponse({ description: `Habitat with this ID doesn't exist` })
  @ApiBadRequestResponse({ description: 'Bad request' })
  update(@Param('id') id: string, @Body() body: HabitatUpdateDto) {
    return this.habitatsService.update(id, body)
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Zookeeper)
  @ApiOperation({ summary: 'Soft delete a habitat' })
  @ApiParam({
    name: 'id',
    description: 'Habitat ID'
  })
  @ApiNotFoundResponse({ description: 'Habitat soft deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.habitatsService.delete(id)
  }
}
