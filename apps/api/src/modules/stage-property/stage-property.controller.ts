import { RolesGuard } from './../auth/guards/roles.guard';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { StagePropertyDto } from './dto/stage-property.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '@space-48/shared/constants';

@Controller('stage-property')
export class StagePropertyController {

  @Roles(UserRoles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async addStageProperty(@Body() dto: StagePropertyDto) {
    return { res: "stage-property was added", dto }
  }
}
