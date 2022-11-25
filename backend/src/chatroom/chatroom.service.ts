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
    if (!createChatroomDto.icon) {
      createChatroomDto.icon = null;
    }

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

  async findEntered(enteringChatroomDto) {
    let result = await this.knex.raw(
      `select * from chatrooms where id IN (select chatroom from chatroom_user where member=?)`,
      [enteringChatroomDto.user],
    );
    result = result.rows;
    console.log('chatroom service findEntered result', result);
    return result;
  }

  async findHosted(enteringChatroomDto) {
    let result = await this.knex.raw(`select * from chatrooms where host = ?`, [
      enteringChatroomDto.user,
    ]);
    result = result.rows;
    // console.log('chatroom service findHosted result', result);
    return result;
  }

  findRecommend() {}

  async findAll() {
    let result = await this.knex.raw(`
    select chatrooms.*, count(distinct chatroom_user.member) as member_count from chatrooms 
    join chatroom_user on chatroom_user.chatroom = chatrooms.id 
    group by chatrooms.id, chatroom_user.id
    order by member_count;
    `)
    return `This action returns all chatroom`;
  }

  async findOne(data: { chatroomId: number; user: number }) {
    // to do check if users is inside the group // is the host of the group
    let result = await this.knex.raw(
      `select * from chatroom_record where chatroom = ?`,
      [data.chatroomId],
    );
    return `This action returns a #${data.chatroomId} chatroom`;
  }

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
