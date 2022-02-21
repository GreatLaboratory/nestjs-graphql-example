import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from '../../../common/entities/base.entity'
import { TeamEntity } from './team.entity'

@Entity({ tableName: 'player' })
export class PlayerEntity extends CustomBaseEntity {
	@Property()
	name: string

	@Property()
	age: number

	@ManyToOne({ nullable: true })
	team: TeamEntity
}
