import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePlayerDto } from './dto/CreatePlayerDto'
import { PlayerModel } from './models/player.model'
import { PlayersService } from './players.service'

@Resolver(() => PlayerModel)
export class PlayersResolver {
	constructor(private readonly playersService: PlayersService) {}

	@Query(() => [PlayerModel])
	async getAllPlayers(): Promise<PlayerModel[]> {
		return await this.playersService.findAll()
	}

	@Mutation(() => PlayerModel)
	async createPlayer(@Args('createPlayerDto') createPlayerDto: CreatePlayerDto): Promise<PlayerModel> {
		return await this.playersService.createPlayer(createPlayerDto)
	}
}
