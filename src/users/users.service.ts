import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
    ) {}

     // Check database backend

    async checkdb(): Promise<string> {
        try {
            await this.usersRepo.query('SELECT 1');
            return 'Database connected successfully';
        } catch (error) {
            return `Database connection failed: ${error.message}`;
        }
    }
    // Insert data to database backend

    async insert(body: { name: string; email: string }): Promise<Users> {
        const user = this.usersRepo.create(body);
        return await this.usersRepo.save(user);
    }

     // display all users from database backend

    async findAll(): Promise<Users[]> {
        return await this.usersRepo.find();
    }

    // To select specific id with info to update data backend

    async findOne1(id: number): Promise<Users> {
        const user = await this.usersRepo.findOne({ where: { id } });
        
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        
        return user;
    }

    // To execute or save new updated data backend

    async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
        const user = await this.findOne1(id);
        Object.assign(user, updateUserDto);
        return await this.usersRepo.save(user);
    }

    // To delete Data in the database backend

    async delete(id: number): Promise<{ message: string }> {
        const user = await this.findOne1(id); // Check if user exists
        await this.usersRepo.remove(user);
        return { message: `User with ID ${id} deleted successfully` };
    }
}

