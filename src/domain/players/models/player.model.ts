import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BaseModel } from '../../../common/models/base.model'

@ObjectType({ implements: () => [BaseModel] })
export class PlayerModel implements BaseModel {
	id: string

	@Field()
	name: string

	@Field(() => Int)
	age: number

	createdAt: Date
	updatedAt: Date
}
