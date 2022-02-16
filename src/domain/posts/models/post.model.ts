import { Field, Int, ObjectType, GraphQLISODateTime, Directive, registerEnumType, Extensions } from '@nestjs/graphql'
import { checkRoleMiddleware, loggerMiddleware } from '../../../common/middlewares/field-logger.middleware'

export enum Role {
	ADMIN,
	GUEST,
}

export enum PostColor {
	RED,
	GREEN,
	BLUE,
}

@ObjectType()
export class Post {
	@Field(() => Int)
	id: number

	@Directive('@upper')
	@Field({ middleware: [checkRoleMiddleware, loggerMiddleware] }) // 특정 필드에만 미들웨어 적용할 때
	@Extensions({ role: [Role.GUEST] }) // 해당 필드는 ADMIN role을 갖는 사용자만 접근할 수 있다.
	title: string

	@Field(() => Int, { nullable: true })
	votes?: number

	@Field(() => PostColor)
	color: PostColor

	// GraphQLISODateTime 타입을 default로 따른다.
	@Field()
	createdAt: Date
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
