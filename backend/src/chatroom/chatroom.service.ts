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
import { MessageChatroomDto } from './dto/message-chatroom.dto';

@Injectable()
export class ChatroomService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  // validate if user is one of the member of chatroom
  async validateUser(data: { userId: number; chatroomId: number }) {
    // console.log('enter chatroom validation');
    let result = await this.knex.raw(
      /*sql*/
      `
      select chatrooms.id from chatrooms where host = ? and id = ?;
      `,
      [data.userId, data.chatroomId],
    );
    if (result.rows.length > 0) {
      // console.log(result.rows[0]);
      return result.rows[0];
    }
    result = await this.knex.raw(
      /*sql*/
      `
      select chatrooms.id
      from chatroom_user
      join chatrooms on chatrooms.id = chatroom_user.chatroom
      where member = ?
      and chatroom = ?
      and status = 'approved'
      and is_ban = false;
      `,
      [data.userId, data.chatroomId],
    );
    // console.log(result.rows[0]);
    return result.rows[0];
  }

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
      ,chatrooms.id
      limit 10;
        `,
      [+enteringChatroomDto.user, +enteringChatroomDto.user],
    );

    result = result.rows;
    // need to fix if joined
    return result;
  }

  findCreated() {}

  async findHosted(enteringChatroomDto: EnteringChatroomDto) {
    let result = await this.knex.raw(
      /*sql*/
      `
      select chatrooms.id, chatrooms.name, chatrooms.icon, from chatrooms
      join chatroom_record on chatroom_record.chatroom = chatrooms.id
      where host = ?
      order by chatroom_record.created_at, chatrooms.id desc
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
    let result = await this.knex.raw(
      /*sql*/
      `
      select chatroom_record.id as recordId 
      ,chatroom_record.record as record
      , users.id as userId
      , userName as username
      , users.avatar as userAvatar
      , chatroom_record.created_at as created_at 
      , chatroom_record.chatroom as chatroomId
      , chatrooms.name as chatroomName
      from chatroom_record 
      join users on chatroom_record.user = users.id 
      join chatrooms on chatroom_record.chatroom = chatrooms.id
      where chatroom_record.chatroom = ?
      order by created_at
      `,
      [+data.chatroomId],
    );
    result = result.rows;
    // console.log('chatroom service findOne result', result);
    return result;
  }

  async sendMessage(messageChatroomDto: MessageChatroomDto) {
    // console.log('entering message service');

    let result = await this.knex.raw(
      /*sql*/
      `
    insert into chatroom_record 
    (record, chatroom, "user")
    values (?,?,?)
    returning id;
    `,
      // insert into chatroom_record
      // (record, "user", chatroom)
      // values ('yo man', 2, 1)
      // returning id;
      [
        messageChatroomDto.message,
        messageChatroomDto.chatroomId,
        messageChatroomDto.userId,
      ],
    );
    let recordId = result.rows[0].id;
    // console.log(recordId);

    result = await this.knex.raw(
      /*sql*/
      `
      select chatroom_record.id as recordId 
      ,chatroom_record.record as record
      , users.id as userId
      , userName as username
      , users.avatar as userAvatar
      , chatroom_record.created_at as created_at 
      , chatroom_record.chatroom as chatroomId
      , chatrooms.name as chatroomName
      from chatroom_record 
      join users on chatroom_record.user = users.id 
      join chatrooms on chatroom_record.chatroom = chatrooms.id
      where chatroom_record.id = ?
      `,
      [recordId],
    );
    result = result.rows[0];
    // console.log('chatroom service sendMessage', result);
    return result;
  }

  async createRecord() {}

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
