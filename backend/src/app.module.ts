import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NamesModule } from './names/names.module'
import ormConfig from './typeorm.config'

@Module({
	imports: [TypeOrmModule.forRoot(ormConfig), NamesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
