import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NamesService } from './names.service'
import { NamesController } from './names.controller'
import { Names } from './names.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Names])],
	providers: [NamesService],
	controllers: [NamesController],
})
export class NamesModule {}
