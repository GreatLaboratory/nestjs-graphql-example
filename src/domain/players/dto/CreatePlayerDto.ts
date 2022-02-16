import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreatePlayerDto {
	@Field()
	name: string

	@Field(() => Int)
	age: number
}
