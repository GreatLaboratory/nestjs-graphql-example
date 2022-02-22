import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BaseModel } from '../../../common/models/base.model'
import { TeamModel } from './team.model'

@ObjectType({ implements: () => [BaseModel] })
export class PlayerModel implements BaseModel {
	id: string

	@Field()
	name: string

	@Field(() => Int)
	age: number

	@Field(() => TeamModel)
	team: TeamModel

	createdAt: Date
	updatedAt: Date
}
