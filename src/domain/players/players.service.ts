import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreatePlayerDto } from './dto/CreatePlayerDto'
import { PersonEntity } from './entities/person.entity'
import { PlayerEntity } from './entities/player.entity'
import { TeamEntity } from './entities/team.entity'
import { PlayerModel } from './models/player.model'

@Injectable()
export class PlayersService {
	constructor(
		@InjectRepository(PlayerEntity)
		private readonly playerRepository: EntityRepository<PlayerEntity>,
		@InjectRepository(PersonEntity)
		private readonly personRepository: EntityRepository<PersonEntity>,
	) {}

	async findAll(): Promise<PlayerModel[]> {
		return await this.playerRepository.findAll()
	}

	async createPlayer(createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
		// persist(entity) is used to mark new entities for future persisting.
		// It will make the entity managed by given EntityManager and once flush will be called, it will be written to the database.
		const newTeam: TeamEntity = new TeamEntity('RiverPool')
		const newPlayer: PlayerEntity = this.playerRepository.create({ ...createPlayerDto, team: newTeam })
		await this.playerRepository.persistAndFlush(newPlayer)

		const person = this.personRepository.create({ firstName: 'Jon', lastName: 'Snow' })
		console.log(person.isInitialized()) // true
		console.log(person) // { firstName: 'Jon', lastName: 'Snow' }
		console.log(person.firstName) // Jon
		console.log(person.lastName) // Snow

		console.log(person.getFullName()) // 'Jon Snow'
		console.log(person.fullName2) // 'Jon Snow'
		console.log(wrap(person)) // { fullName: 'Jon Snow', fullName2: 'Jon Snow' }

		return newPlayer
	}
}
