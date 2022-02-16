import { Field, ID, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class BaseModel {
	@Field(() => ID)
	id: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
