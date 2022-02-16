import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreatePlayerDto } from './dto/CreatePlayerDto'
import { PlayerEntity } from './entities/player.entity'
import { PlayerModel } from './models/player.model'

@Injectable()
export class PlayersService {
	constructor(
		@InjectRepository(PlayerEntity)
		private readonly playerRepository: EntityRepository<PlayerEntity>,
	) {}

	async findAll(): Promise<PlayerModel[]> {
		return await this.playerRepository.findAll()
	}

	async createPlayer(createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
		// persist(entity) is used to mark new entities for future persisting.
		// It will make the entity managed by given EntityManager and once flush will be called, it will be written to the database.
		const newPlayer: PlayerEntity = this.playerRepository.create(createPlayerDto)
		await this.playerRepository.persistAndFlush(newPlayer)
		return newPlayer
	}
}
