import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { JoinChatroomDto } from './dto/join-chatroom.dto';

@Injectable()
export class ChatroomService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createChatroomDto: CreateChatroomDto) {
    if (!!createChatroomDto.icon) {
      createChatroomDto.icon = null;
    }
    console.log('createChatroomDto in service', createChatroomDto);

    let result = await this.knex('chatrooms')
      .insert([
        {
          host: createChatroomDto.host,
          name: createChatroomDto.name,
          icon: createChatroomDto.icon,
          introduction: createChatroomDto.introduction,
        },
      ])
      .returning('id');
    return result;
  }

  async join(joinChatroomDto: JoinChatroomDto) {
    let result = await this.knex('chatroom_user')
      .insert([
        {
          member: joinChatroomDto.member,
          chatroom: joinChatroomDto.chatroomId,
          status: 'approved',
        },
      ])
      .returning('id');
    console.log('chatroom service join id ', result);
    return result;
  }

  findCreated() {}

  findEntered() {}

  findRecommend() {}

  findAll() {
    return `This action returns all chatroom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroom`;
  }

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
