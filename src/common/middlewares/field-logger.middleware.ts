import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'

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
