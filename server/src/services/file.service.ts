import sharp from 'sharp';
import { ICloudStorage, cloudStorageInstance } from './cloud-storage.service';

export interface IFileService {
  uploadFile(file: Express.Multer.File): Promise<string>;
}
export class FileService {
  constructor(private storageClient: ICloudStorage = cloudStorageInstance) {}

  public async uploadFile(file: Express.Multer.File) {
    return this.storageClient.uploadFile( await this.resizeAndCrop(file));
  }

  private async resizeAndCrop(file: Express.Multer.File) : Promise<Express.Multer.File> {
    const image = sharp(file.buffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Failed to get image dimensions');
    }

    const minDimension = Math.min(metadata.width, metadata.height);
    const xOffset = (metadata.width - minDimension) / 2;
    const yOffset = (metadata.height - minDimension) / 2;

    const processedImageBuffer = await image
      .extract({
        left: xOffset,
        top: yOffset,
        width: minDimension,
        height: minDimension,
      })
      .resize({ width: 1000, height: 1000 })
      .toBuffer();

    return {...file, buffer:processedImageBuffer};
  } 
}
