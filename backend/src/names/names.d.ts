import { IsEmail, IsEnum, IsString } from 'class-validator'
import { Gender } from './names.entity'

export class NamesDto {
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsEnum(Gender)
	gender: Gender
}
