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
import { EnteringChatroomDto } from './dto/entering-chatroom.dto';
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
    let result;
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
        if (s3File == 'error') {
          throw new Error('圖片發生錯誤, 請重新輸入');
        }
        createChatroomDto.icon = s3File;
        result = await this.chatroomService.create(createChatroomDto);
        // error when sending icon to s3
      } else {
        createChatroomDto.icon = null;
        result = await this.chatroomService.create(createChatroomDto);
      }
      return result;
    } catch (err) {
      console.log(err);
      if (err.constraint == 'chatrooms_name_unique') {
        throw new HttpException(
          '已有此聊天室, 請用新名字',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/join')
  async join(@Body() joinChatroomDto: JoinChatroomDto) {
    await this.chatroomService.join(joinChatroomDto);
  }

  @Post('/all')
  async findAll(@Body() enteringChatroomDto: EnteringChatroomDto) {
    let result = await this.chatroomService.findAll(enteringChatroomDto);
    console.log('enter chatroom controller findall', result);
    return result;
  }

  @Post('/recommend')
  async findRecommend(@Body() enteringChatroomDto: EnteringChatroomDto) {
    let result = await this.chatroomService.findRecommend(enteringChatroomDto);
    console.log('enter chatroom controller find recommend', result);
    return result;
  }

  @Get('/created')
  findCreated() {
    return this.chatroomService.findCreated();
  }

  @Post('/hosted')
  async findHosted(@Body() enteringChatroomDto: EnteringChatroomDto) {
    let result = await this.chatroomService.findHosted(enteringChatroomDto);
    console.log('enter chatroom controller findEnter', result);
    return result;
  }

  @Post('/entered')
  async findEntered(@Body() enteringChatroomDto: EnteringChatroomDto) {
    let result = await this.chatroomService.findEntered(enteringChatroomDto);
    console.log('enter chatroom controller findEnter', result);
    return result;
  }

  @Post(':id')
  async findOne(
    @Param('id') id: number,
    @Body() enteringChatroomDto: EnteringChatroomDto,
  ) {
    let data = { chatroomId: +id, user: +enteringChatroomDto.user };
    let result = await this.chatroomService.findOne(data);
    console.log('enter chatroom controller find one', result);
    return result;
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
