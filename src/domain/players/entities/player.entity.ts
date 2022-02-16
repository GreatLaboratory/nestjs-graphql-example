import { Entity, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from '../../../common/entities/base.entity'

@Entity({ tableName: 'player' })
export class PlayerEntity extends CustomBaseEntity {
	@Property()
	name: string

	@Property()
	age: number
}
