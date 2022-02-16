import { ForbiddenException } from '@nestjs/common'
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'
import { Role } from '../../domain/posts/models/post.model'

export const loggerMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
	// The MiddlewareContext is an object that consist of the same arguments that are normally received by the GraphQL resolver function
	const { args, context, source, info } = ctx

	//while NextFn is a function that let you execute the next middleware in the stack (bound to this field) or the actual field resolver.
	const value = await next()

	// simply just log the field value
	console.log('[Field middleware logging] :::', value)

	// return 형식에 따라 변형할 수도 있다.
	// if (typeof value === 'string') return value.toUpperCase()
	return value
}

export const checkRoleMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
	const { info } = ctx
	const { extensions } = info.parentType.getFields()[info.fieldName]

	/**
	 * In a real-world application, the "userRole" variable
	 * should represent the caller's (user) role (for example, "ctx.user.role").
	 */
	const userRole: Role = Role.GUEST
	if (!extensions.role.includes(userRole)) {
		throw new ForbiddenException(`User does not have sufficient permissions to access "${info.fieldName}" field.`)
	}

	return next()
}
