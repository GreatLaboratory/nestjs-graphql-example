import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from '../../../common/entities/base.entity'
import { PlayerEntity } from './player.entity'

@Entity({ tableName: 'team' })
export class TeamEntity extends CustomBaseEntity {
	constructor(name: string) {
		super()
		this.name = name
	}
	@Property()
	name: string

	@OneToMany(() => PlayerEntity, (player) => player.team)
	players = new Collection<PlayerEntity>(this)
}
