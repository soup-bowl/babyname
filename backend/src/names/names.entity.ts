import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export enum Gender {
	Male = 'male',
	Female = 'female',
	Universal = 'universal',
}

@Entity()
export class Names {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({
		type: 'text',
		default: Gender.Universal,
	})
	gender: Gender
}
