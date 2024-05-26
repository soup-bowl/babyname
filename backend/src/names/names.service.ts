import { Injectable } from '@nestjs/common'
import { Names } from './names.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class NamesService {
	constructor(
		@InjectRepository(Names)
		private usersRepository: Repository<Names>,
	) {}

	findAll(): Promise<Names[]> {
		return this.usersRepository.find()
	}

	findOne(id: number): Promise<Names> {
		return this.usersRepository.findOne({ where: { id } })
	}

	create(user: Names): Promise<Names> {
		return this.usersRepository.save(user)
	}

	async update(id: number, user: Names): Promise<void> {
		await this.usersRepository.update(id, user)
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete(id)
	}
}
