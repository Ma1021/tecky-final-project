import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as socketIO from 'socket.io';
import { setIO } from './io';
import { ChatroomController } from './chatroom/chatroom.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Setting Swagger Config
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-starter api document')
    .setDescription('stock app backend api document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document); // localhost:8080/doc to open document

  // app.use(helmet());
  app.enableCors(); // 允許所有port存取

  // 加socket.io
  const server = await app.listen(8080);
  // 要等server起好先可以拎到io用, 先export去io.ts度
  const io = new socketIO.Server(server, {
    // 允許所有domain嚟 socket.io https://socket.io/docs/v3/handling-cors/
    cors: {
      origin: '*',
    },
  });
  setIO(io);
  ChatroomController.instance.setupIO(io);
}

bootstrap();
