import { Controller, UseGuards } from "@nestjs/common/decorators/core"
import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common/decorators/http"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { UsersService } from "./users.service" // Changed from type-only import
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("users")
@Controller("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "List all users" })
  @ApiResponse({ status: 200, description: "List of users returned successfully" })
  @Roles("admin")
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @Roles("admin")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({ status: 200, description: 'User removed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
