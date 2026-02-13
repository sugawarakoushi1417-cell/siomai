import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  database: '3idiots',
  password: '',
  entities: [Users],
  synchronize: true,
}),
TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AppController, UsersController, AdminController],
  providers: [AppService, UsersService],
  
})
export class AppModule {}
