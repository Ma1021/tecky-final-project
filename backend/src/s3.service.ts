import { env } from '../env';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = env.S3_BUCKET_NAME;

  s3 = new AWS.S3({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile(file: {
    fileBuffer: Buffer;
    fileName: string;
    fileMimetype: string;
  }) {
    // return the link of photo
    console.log('entered s3 upload');
    let result = await this.s3_upload(
      file.fileBuffer,
      this.AWS_S3_BUCKET,
      file.fileName,
      file.fileMimetype,
    );
    console.log('s3 result', result);
    return result;
  }

  async s3_upload(dataBuffer, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: dataBuffer,
      //   ACL: 'public-read',
      ContentType: mimetype,
      // ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: env.S3_REGION,
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();

      console.log('link', s3Response.Location);
      return s3Response.Location;
      // return the link of photo
    } catch (e) {
      console.log(e);
      return 'error';
    }
  }
}
