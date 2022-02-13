import { Field, Int, ObjectType, GraphQLISODateTime, Directive, registerEnumType } from '@nestjs/graphql'

@ObjectType()
export class Post {
	@Field(() => Int)
	id: number

	@Directive('@upper')
	@Field()
	title: string

	@Field(() => Int, { nullable: true })
	votes?: number

	@Field(() => PostColor)
	color: PostColor

	// GraphQLISODateTime 타입을 default로 따른다.
	@Field()
	createdAt: Date
}

export enum PostColor {
	RED,
	GREEN,
	BLUE,
}

registerEnumType(PostColor, {
	name: 'PostColor',
	/**
	 * @throws GraphQLError: Syntax Error: Invalid character within String: "\u001d".
	 * When I add below property(description, valuesMap), I got this error
	 */
	// description: 'post cover color',
	// valuesMap: {
	// 	RED: { description: 'default color' },
	// 	BLUE: { deprecationReason: 'feel so blue' },
	// 	GREEN: { description: 'my favorite color' },
	// },
})
