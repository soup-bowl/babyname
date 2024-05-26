import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { NamesService } from './names.service'
import { Names } from './names.entity'
import { NamesDto } from './names'

@Controller('names')
export class NamesController {
	constructor(private readonly usersService: NamesService) {}

	@Get()
	findAll(): Promise<Names[]> {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Names> {
		return this.usersService.findOne(+id)
	}

	@Post()
	create(@Body() createUserDto: NamesDto): Promise<Names> {
		const name = new Names()
		name.name = createUserDto.name
		name.gender = createUserDto.gender
		return this.usersService.create(name)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() user: Names): Promise<void> {
		return this.usersService.update(+id, user)
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.usersService.remove(+id)
	}
}
