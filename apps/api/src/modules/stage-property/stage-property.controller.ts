import { S3Service } from './../../services/S3.service';
import { StagePropertyService } from './stage-property.service';
import { RolesGuard } from './../auth/guards/roles.guard';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import 'multer';
import {
  StagePropertyDto,
  EditStagePropertyDto,
} from './dto/stage-property.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Put,
  BadRequestException,
  Delete,
  Param,
  NotFoundException,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoles } from '@space-48/shared/constants';
import {
  STAGE_PROPERTY_DELETED,
  STAGE_PROPERTY_NOT_FOUND,
} from './stage-property.constants';
import { ImageInterceptor } from '../../interceptors/image.interceptor';

@Controller('stage-property')
export class StagePropertyController {
  constructor(
    private readonly stagePropertyService: StagePropertyService,
    private readonly s3Service: S3Service
  ) {}

  @Roles(UserRoles.admin, UserRoles.super_admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('')
  @ImageInterceptor()
  async addStageProperty(
    @Req() req: Express.Request & { fileValidationError: string },
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dto: StagePropertyDto
  ) {
    if (!images.length) {
      throw new BadRequestException('Images are required');
    }

    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    const imagesUrls = await this.s3Service.uploadFiles(images);

    return this.stagePropertyService.createStageProperty({
      ...dto,
      images: imagesUrls,
    });
  }

  @Roles(UserRoles.admin, UserRoles.super_admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put('')
  @ImageInterceptor()
  async editStageProperty(
    @Body() dto: EditStagePropertyDto,
    @Req() req: Express.Request & { fileValidationError: string },
    @UploadedFiles() images: Array<Express.Multer.File> = []
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    const oldStageProperty =
      await this.stagePropertyService.getStagePropertyById(dto.id);

    if (!oldStageProperty) {
      throw new BadRequestException(STAGE_PROPERTY_NOT_FOUND);
    }

    const imagesForRemoving = dto.images?.length
      ? oldStageProperty.images.filter((oldImg) => {
          if (typeof dto.images === 'string') {
            return dto.images !== oldImg;
          }

          return !dto.images.includes(oldImg);
        })
      : [];

    await this.s3Service.deleteObjectsByUrl(imagesForRemoving);

    const imagesUrls = images.length
      ? await this.s3Service.uploadFiles(images)
      : [];

    const calculatedImages = dto.images
      ? [
          ...imagesUrls,
          ...(typeof dto.images === 'string' ? [dto.images] : dto.images),
        ]
      : imagesUrls;

    const editedStageProperty =
      await this.stagePropertyService.editStagePropertyById(dto.id, {
        ...dto,
        ...(calculatedImages.length && { images: calculatedImages }),
      });

    return editedStageProperty;
  }

  @Roles(UserRoles.admin, UserRoles.super_admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async deleteStageProperty(@Param('id') id: string) {
    const res = await this.stagePropertyService.findAndDeleteStagePropertyById(
      id
    );

    if (!res) {
      throw new NotFoundException(STAGE_PROPERTY_NOT_FOUND);
    }

    this.s3Service.deleteObjectsByUrl(res.images);

    return {
      message: STAGE_PROPERTY_DELETED,
    };
  }

  @Get('')
  async getStageProperty() {
    return this.stagePropertyService.getStageProperties();
  }
}
