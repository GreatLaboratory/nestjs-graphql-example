import { Entity, EntityRepositoryType, ManyToOne, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from '../../../common/entities/base.entity'
import { PlayerRepository } from '../players.repository'
import { TeamEntity } from './team.entity'

@Entity({ tableName: 'player', customRepository: () => PlayerRepository })
export class PlayerEntity extends CustomBaseEntity {
	[EntityRepositoryType]?: PlayerRepository

	@Property()
	name: string

	@Property()
	age: number

	@ManyToOne({ nullable: true })
	team: TeamEntity
}
