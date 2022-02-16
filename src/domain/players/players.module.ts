import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PlayerEntity } from './entities/player.entity'
import { PlayersService } from './players.service'
import { PlayersResolver } from './players.resolver'

@Module({ imports: [MikroOrmModule.forFeature([PlayerEntity])], providers: [PlayersService, PlayersResolver] })
export class PlayersModule {}
