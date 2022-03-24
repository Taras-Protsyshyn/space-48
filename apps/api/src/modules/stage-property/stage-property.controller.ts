import { StagePropertyService } from './stage-property.service';
import { RolesGuard } from './../auth/guards/roles.guard';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { StagePropertyDto, EditStagePropertyDto } from './dto/stage-property.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Put, BadRequestException, Delete, Param, NotFoundException } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '@space-48/shared/constants';
import { STAGE_PROPERTY_DELETED, STAGE_PROPERTY_NOT_FOUND } from './stage-property.constants';

@Controller('stage-property')
export class StagePropertyController {
  constructor(
    private readonly stagePropertyService: StagePropertyService
  ) { }

  @Roles(UserRoles.admin, UserRoles.super_admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('')
  async addStageProperty(@Body() dto: StagePropertyDto) {

    return this.stagePropertyService.createStageProperty(dto);
  }

  @Roles(UserRoles.admin, UserRoles.super_admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put('')
  async editStageProperty(@Body() dto: EditStagePropertyDto) {
    const editedStageProperty = await this.stagePropertyService.editStagePropertyById(dto.id, dto);

    if (!editedStageProperty) {
      throw new BadRequestException(STAGE_PROPERTY_NOT_FOUND)
    }

    return editedStageProperty;
  }

  @Roles(UserRoles.admin, UserRoles.super_admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async deleteStageProperty(@Param("id") id: string) {
    const res = await this.stagePropertyService.findAndDeleteStagePropertyById(id);

    if (!res) {
      throw new NotFoundException(STAGE_PROPERTY_NOT_FOUND)
    }


    return {
      message: STAGE_PROPERTY_DELETED,
    };
  }

  @Get('')
  async getStageProperty() {

    return this.stagePropertyService.getStageProperties();
  }
}
