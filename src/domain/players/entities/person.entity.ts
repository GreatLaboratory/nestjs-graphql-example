import { Entity, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from '../../../common/entities/base.entity'

/**
 * Virtual Property 궁금해서 따라해보기
 * https://mikro-orm.io/docs/defining-entities#virtual-properties
 */
@Entity({ tableName: 'person' })
export class PersonEntity extends CustomBaseEntity {
	@Property({ hidden: true })
	firstName!: string

	@Property({ hidden: true })
	lastName!: string

	@Property({ name: 'fullName' })
	getFullName() {
		return `${this.firstName} ${this.lastName}`
	}

	@Property({ persist: false })
	get fullName2() {
		return `${this.firstName} ${this.lastName}`
	}
}
