import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { filterFileImages } from '../utils/files/filterFileImages';

export const ImageInterceptor = (limit = 10) =>
  UseInterceptors(
    FilesInterceptor('images', limit, { fileFilter: filterFileImages })
  );
