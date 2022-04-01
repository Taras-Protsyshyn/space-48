import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  defaultConfig = { accessKey: '', keySecret: '', s3BucketName: '' };

  config: {
    accessKey: string;
    keySecret: string;
    s3BucketName: string;
  };
  s3;

  constructor(private configService: ConfigService) {
    this.config = this.configService.get('aws') || this.defaultConfig;

    this.s3 = new AWS.S3({
      accessKeyId: this.config.accessKey,
      secretAccessKey: this.config.keySecret,
    });
  }

  getKeyFromUrl(url: string): string {
    return new URL(url).pathname.replace('/', '');
  }

  async getExistingObject(
    params: S3.Types.GetObjectAclRequest
  ): Promise<S3.Types.GetObjectOutput | null> {
    try {
      const bucketLocation = await this.s3.getObject(params).promise();

      return bucketLocation;
    } catch (error) {
      return null;
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: this.config.s3BucketName,
      Key: `${new Date().getTime()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    const res = await this.s3.upload(params).promise();

    return res.Location;
  }

  async uploadFiles(files: Array<Express.Multer.File>): Promise<Array<string>> {
    const locations = [];

    for (const file of files) {
      const location = await this.upload(file);

      locations.push(location);
    }

    return locations;
  }

  async deleteObjectByUrl(objectUrl: string) {
    await this.s3
      .deleteObject({
        Bucket: this.config.s3BucketName,
        Key: this.getKeyFromUrl(objectUrl),
      })
      .promise();
  }

  async deleteObjectsByUrl(objectUrls: string[]): Promise<void> {
    if (objectUrls.length) {
      await this.s3
        .deleteObjects({
          Bucket: this.config.s3BucketName,
          Delete: {
            Objects: objectUrls.map((url) => ({
              Key: this.getKeyFromUrl(url),
            })),
          },
        })
        .promise();
    }
  }
}
