import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType()
export class Post {
	@Field(() => Int)
	id: number

	@Field()
	title: string

	@Field(() => Int, { nullable: true })
	votes?: number

	// GraphQLISODateTime 타입을 default로 따른다.
	@Field()
	createdAt: Date
}
