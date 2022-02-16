import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ abstract: true })
export abstract class CustomBaseEntity extends BaseEntity<CustomBaseEntity, 'id'> {
	@PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
	id: string

	@Property()
	createdAt: Date = new Date()

	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date()
}
