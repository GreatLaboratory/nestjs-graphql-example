import { Field, Int, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class Human {
	@Field(() => Int)
	id: number

	@Field({ nullable: true })
	firstName?: string

	@Field({ nullable: true })
	lastName?: string
}
