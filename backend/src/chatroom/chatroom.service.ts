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
import { EnteringChatroomDto } from './dto/entering-chatroom.dto';

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
    // check if chatroom user is already joined
    let checkJoin = await this.knex('chatroom_user').select('*').where({
      chatroom: joinChatroomDto.chatroomId,
      member: joinChatroomDto.userId,
    });
    if (!!checkJoin.length) {
      throw new Error('已經加入該群組');
    }
    let result = await this.knex('chatroom_user')
      .insert([
        {
          member: +joinChatroomDto.userId,
          chatroom: +joinChatroomDto.chatroomId,
          status: 'approved',
        },
      ])
      .returning(['id', 'chatroom']);
    return result;
  }

  async findAll(enteringChatroomDto: EnteringChatroomDto) {
    // find all no host and no member
    let result = await this.knex.raw(
      /*sql*/
      `
      select chatrooms.*
      ,count(chatroom_user.member) as member_count
      from chatrooms
      full join chatroom_user on chatrooms.id = chatroom_user.chatroom
      where chatrooms.host NOT IN (?)
      and chatrooms.id NOT in (
          select chatrooms.id
          from chatroom_user
              join chatrooms on chatrooms.id = chatroom_user.chatroom
          where chatroom_user.member = ?
      )
      group by chatrooms.id
      ORDER BY member_count desc
      ,chatrooms.id;
      `,
      [+enteringChatroomDto.user, +enteringChatroomDto.user],
    );
    // need to fix if join
    result = result.rows;
    console.log('find all service', result);
    return result;
  }

  async findRecommend(enteringChatroomDto: EnteringChatroomDto) {
    // find all no host and no user with only kol -- top 10
    let result = await this.knex.raw(
      /*sql*/
      `
      select chatrooms.*
      ,count(chatroom_user.member) as member_count
      from chatrooms
      full join chatroom_user on chatrooms.id = chatroom_user.chatroom
      where chatrooms.host NOT IN (?)
      and chatrooms.id NOT in (
          select chatrooms.id
          from chatroom_user
              join chatrooms on chatrooms.id = chatroom_user.chatroom
          where chatroom_user.member = ?
      )
      and chatrooms.id IN(
          SELECT chatrooms.id
          from chatrooms
          where chatrooms.host IN (
                  select id
                  from users
                  where user_type = 'kol'
              )
      )
      group by chatrooms.id
      ORDER BY member_count desc
      ,chatrooms.id;
        `,
      [+enteringChatroomDto.user, +enteringChatroomDto.user],
    );

    result = result.rows;
    // need to fix if joined
    console.log('find recommend service', result);
    return result;
  }

  findCreated() {}

  async findHosted(enteringChatroomDto: EnteringChatroomDto) {
    let result = await this.knex.raw(
      /*sql*/
      `
      select distinct on chatrooms.id from chatrooms
      inner join chatroom_record on chatroom_record.chatroom = chatrooms.id
      where host = ?
      order by chatroom_record.created_at, chatrooms.id desc
      limit by 1;
      `,
      [+enteringChatroomDto.user],
    );
    result = result.rows;
    // console.log('chatroom service findHosted result', result);
    return result;
  }

  async findEntered(enteringChatroomDto: EnteringChatroomDto) {
    let result = await this.knex.raw(
      /*sql*/
      `
      select * from chatrooms 
      where id IN (select chatroom from chatroom_user 
        where member=? and status='approved');
        `,
      [+enteringChatroomDto.user, +enteringChatroomDto.user],
    );
    result = result.rows;
    // console.log('chatroom service findEntered result', result);
    return result;
  }

  async findOne(data: { chatroomId: number; user: number }) {
    // to do check if users is inside the group // is the host of the group
    let result = await this.knex.raw(
      /*sql*/
      `select * from chatroom_record where chatroom = ?`,
      [+data.chatroomId],
    );
    return `This action returns a #${data.chatroomId} chatroom`;
  }

  async createRecord() {}

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
