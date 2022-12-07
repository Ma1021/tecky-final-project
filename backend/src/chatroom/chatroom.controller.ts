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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Server } from 'socket.io';
import { ChatroomAuthGuard } from 'src/chatroom/chatroom-auth.guard';
import { io } from 'src/io';
import { S3Service } from 'src/s3.service';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { EnteringChatroomDto } from './dto/entering-chatroom.dto';
import { JoinChatroomDto } from './dto/join-chatroom.dto';
import { MessageChatroomDto } from './dto/message-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@Controller('chatroom')
export class ChatroomController {
  // 鏡中鏡
  static instance: ChatroomController;

  constructor(
    private readonly chatroomService: ChatroomService,
    private readonly s3Service: S3Service,
    private readonly httpService: HttpService,
  ) {
    // 未起好socket.io --> console.log(io) --> undefined
    // console.log('chatroom controller constructing, socket io status:', !!io);

    // 整多個自己係自己入面
    ChatroomController.instance = this;
  }

  // tell chatroom to take up socket.io
  setupIO(io: Server) {
    console.log('enter setupIO');
    io.on('connection', (socket) => {
      console.log('socket connected:', socket.id);
      socket.on('join-room', (roomId) => {
        socket.join('room:' + roomId);
        console.log('join room', { id: socket.id, roomId });
      });
    });
  }

  // tell chatroom to leave socket.io
  teardownIO(io: Server) {
    console.log('enter setupIO');
    io.on('disconnection', (socket) => {
      console.log('socket disconnected:', socket.id);
      socket.on('leave-room', (roomId) => {
        socket.leave('room:' + roomId);
        console.log('join room', { id: socket.id, roomId });
      });
    });
  }

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
    try {
      let result = await this.chatroomService.join(joinChatroomDto);
      // return the chatroom id for redirection
      return result;
    } catch (error) {
      if (error.message.includes('已經加入該群組')) {
        throw new HttpException(error.message, HttpStatus.CREATED);
      }
      throw new HttpException(error.message, HttpStatus.CREATED);
    }
  }

  @Post('/all')
  async findAll(@Body() enteringChatroomDto: EnteringChatroomDto) {
    try {
      let result = await this.chatroomService.findAll(enteringChatroomDto);
      // console.log('enter chatroom controller findall', result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/recommend')
  async findRecommend(@Body() enteringChatroomDto: EnteringChatroomDto) {
    try {
      let result = await this.chatroomService.findRecommend(
        enteringChatroomDto,
      );
      // console.log('enter chatroom controller find recommend', result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/host')
  async findHosted(@Body() enteringChatroomDto: EnteringChatroomDto) {
    try {
      let result = await this.chatroomService.findHosted(enteringChatroomDto);
      // console.log('enter chatroom controller find host', result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/entered')
  async findEntered(@Body() enteringChatroomDto: EnteringChatroomDto) {
    try {
      let result = await this.chatroomService.findEntered(enteringChatroomDto);
      // console.log('enter chatroom controller findEnter', result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ----------------------------------------------------------------------------------

  // entering chatroom
  @UseGuards(ChatroomAuthGuard)
  @Post(':id')
  async findOne(
    @Param('id') id: number,
    @Body() joinChatroomDto: JoinChatroomDto,
  ) {
    console.log(joinChatroomDto);
    try {
      let data = { chatroomId: +id, user: +joinChatroomDto.userId };
      let result = await this.chatroomService.findOne(data);
      // console.log('enter chatroom controller find one', result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // entering chatroom
  @UseGuards(ChatroomAuthGuard)
  @Post(':id/name')
  async findChatroomName(
    @Param('id') id: number,
    @Body() joinChatroomDto: JoinChatroomDto,
  ) {
    try {
      let result = await this.chatroomService.findChatroomName(id);
      console.log('enter chatroom controller find one', result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // handling messaging
  @UseGuards(ChatroomAuthGuard)
  @Post(':id/message')
  async postChatMessage(
    @Param('id') roomId: string,
    // unknown as not knowing what user will send
    @Body() messageChatDto: MessageChatroomDto,
  ) {
    // console.log('entering message controller');
    let result = await this.chatroomService.sendMessage(messageChatDto);
    // use the message to do socket
    io.to(`room:${roomId}`).emit('new-message', result);
    return result;
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  @UseGuards(ChatroomAuthGuard)
  @Post(':id/namelist')
  async findNamelist(
    @Param('id') roomId: number,
    @Body() enteringChatroomDto: JoinChatroomDto,
  ) {
    // console.log('entering chatroom findname list controller');
    let result = await this.chatroomService.findNameList({
      userId: enteringChatroomDto.userId,
      roomId,
    });
    // console.log('chatroom controller, findNamelist', result);
    return result;
  }

  @UseGuards(ChatroomAuthGuard)
  @Post(':id/namelist/remove')
  async removeMember(
    @Param('id') roomId: number,
    @Body() enteringChatroomDto: JoinChatroomDto,
  ) {
    // console.log('entering chatroom findname list controller');
    let result = await this.chatroomService.removeMember({
      userId: enteringChatroomDto.userId,
      roomId,
    });
    // console.log('chatroom controller, findNamelist', result);
    return result;
  }

  @UseGuards(ChatroomAuthGuard)
  @Post(':id/quit')
  async quit(
    @Param('id') roomId: number,
    @Body() enteringChatroomDto: JoinChatroomDto,
  ) {
    // console.log('entering chatroom findname list controller');
    let result = await this.chatroomService.quit({
      userId: enteringChatroomDto.userId,
      roomId,
    });
    // console.log('chatroom controller, findNamelist', result);
    return result;
  }

  //=================================================================================================
  // push notifications below
  //=================================================================================================
  @UseGuards(ChatroomAuthGuard)
  @Post(':id/namelist/push')
  async findNamelistPush(
    @Param('id') roomId: number,
    @Body() enteringChatroomDto: JoinChatroomDto,
  ) {
    // console.log('entering chatroom findname list controller');
    let result = await this.chatroomService.findNameListPush({
      userId: enteringChatroomDto.userId,
      roomId,
    });
    // console.log('chatroom controller, findNamelist', result);
    return result;
  }

  //=================================================================================================
  // push notifications above
  //=================================================================================================

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
