import { Injectable, NotFoundException } from "@nestjs/common"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import * as bcrypt from "bcrypt"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Injected directly
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })
    return this.usersRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ["id", "name", "email", "grupos_id", "created_at", "updated_at"],
    })
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ["id", "name", "email", "grupos_id", "created_at", "updated_at"],
    })

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`)
    }

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)

    // Se a senha estiver sendo atualizada, hash ela
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    this.usersRepository.merge(user, updateUserDto)
    return this.usersRepository.save(user)
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id)
    await this.usersRepository.remove(user)
  }
}
