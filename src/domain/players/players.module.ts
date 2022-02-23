import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PlayerEntity } from './entities/player.entity'
import { PlayersService } from './players.service'
import { PlayersResolver } from './players.resolver'
import { PersonEntity } from './entities/person.entity'
import { TeamEntity } from './entities/team.entity'

@Module({
	imports: [MikroOrmModule.forFeature([PlayerEntity, PersonEntity, TeamEntity])],
	providers: [PlayersService, PlayersResolver],
})
export class PlayersModule {}
