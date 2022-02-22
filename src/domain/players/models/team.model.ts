import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from '../../../common/models/base.model'

@ObjectType({ implements: () => [BaseModel] })
export class TeamModel implements BaseModel {
	id: string

	@Field()
	name: string

	createdAt: Date
	updatedAt: Date
}
