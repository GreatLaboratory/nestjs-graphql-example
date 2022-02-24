import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreatePlayerDto } from './dto/CreatePlayerDto'
import { PersonEntity } from './entities/person.entity'
import { PlayerEntity } from './entities/player.entity'
import { TeamEntity } from './entities/team.entity'
import { PlayerModel } from './models/player.model'
import { PlayerRepository } from './players.repository'

@Injectable()
export class PlayersService {
	constructor(
		@InjectRepository(PlayerEntity)
		private readonly playerRepository: EntityRepository<PlayerEntity>,
		private readonly customPlayerRepository: PlayerRepository,
		@InjectRepository(PersonEntity)
		private readonly personRepository: EntityRepository<PersonEntity>,
		@InjectRepository(TeamEntity)
		private readonly teamRepository: EntityRepository<TeamEntity>,
	) {}

	async findAll(): Promise<PlayerModel[]> {
		return await this.playerRepository.findAll({ populate: true })

		// 아래와 같이 pagination 가능
		const [players2, count] = await this.playerRepository.findAndCount({}, { limit: 2, offset: 1 })
		console.log('count : ', count) // pagination 없이 총 로우 갯수
		return players2

		// 아래와 같이 populate helper함수를 사용하면 이미 로드된 엔티티에 대해서도 참조를 찾아낼 수 있다.
		const players: PlayerEntity[] = await this.playerRepository.findAll()
		return await this.playerRepository.populate(players, ['team'])

		// 아래와 같이 find함수에 pk 배열로 찾을 수도 있다.
		return await this.customPlayerRepository.find(
			['c8475f21-c1c6-413e-91ab-190a367b5288', 'e97c4abd-4b42-42f4-9235-56947a930825'],
			{ populate: true },
		)
	}

	async findOne(): Promise<PlayerModel> {
		// player id - pk로 선수 찾기
		return await this.playerRepository.findOne('e97c4abd-4b42-42f4-9235-56947a930825')

		// 특정 필드만 조회하기 (populate까지)
		return await this.playerRepository.findOne('e97c4abd-4b42-42f4-9235-56947a930825', {
			fields: ['name', 'age', { team: ['name'] }],
		})

		// team id로 선수 찾기
		return await this.playerRepository.findOne({ team: 'eb01155e-3d48-42ee-8e28-0341be4a5c79' })

		// team name으로 선수 찾기
		return await this.playerRepository.findOne({ team: { name: 'RiverPool' } }, { populate: true })
	}

	async createPlayer(createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
		let newPlayer: PlayerEntity
		try {
			const team: TeamEntity = await this.teamRepository.findOneOrFail({ name: 'Arsenal' })
			newPlayer = this.playerRepository.create({ ...createPlayerDto, team })
		} catch (e) {
			console.log(e)
			newPlayer = this.playerRepository.create({ ...createPlayerDto, team: new TeamEntity('Arsenal') }) // persist cascade
		}

		// persist(entity) is used to mark new entities for future persisting.
		// It will make the entity managed by given EntityManager and once flush will be called, it will be written to the database.
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
