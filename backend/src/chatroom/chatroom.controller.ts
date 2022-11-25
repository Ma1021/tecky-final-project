import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { S3Service } from 'src/s3.service';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { JoinChatroomDto } from './dto/join-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@Controller('chatroom')
export class ChatroomController {
  constructor(
    private readonly chatroomService: ChatroomService,
    private readonly s3Service: S3Service,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  async create(
    @Body() createChatroomDto: CreateChatroomDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('create new chatroom');
    console.log(createChatroomDto);
    console.log(file);
    // return 'entered create';
    if (createChatroomDto.host === 0) {
      throw new HttpException('請先登入', HttpStatus.UNAUTHORIZED);
    }

    try {
      // createChatroomDto is ""
      // ! createChatroomDto = true
      if (!!file) {
        let fileUpload = {
          fileBuffer: file.buffer,
          fileName: file.originalname,
          fileMimetype: file.mimetype,
        };
        let s3File = await this.s3Service.uploadFile(fileUpload);
        console.log(s3File);
        if (s3File == 'error') {
          throw new Error('圖片發生錯誤, 請重新輸入');
        }
        createChatroomDto.icon = s3File;
        // error when sending icon to s3
      } else {
        createChatroomDto.icon = null;
      }
      return await this.chatroomService.create(createChatroomDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/join')
  async join(@Body() joinChatroomDto: JoinChatroomDto) {
    await this.chatroomService.join(joinChatroomDto);
  }

  @Get()
  findAll() {
    return this.chatroomService.findAll();
  }

  @Get('/created')
  findCreated() {
    return this.chatroomService.findCreated();
  }

  @Get('/entered')
  findEntered() {
    return this.chatroomService.findEntered();
  }

  @Get('/recommend')
  findRecommend() {
    return this.chatroomService.findRecommend();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatroomDto: UpdateChatroomDto,
  ) {
    return this.chatroomService.update(+id, updateChatroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomService.remove(+id);
  }
}
