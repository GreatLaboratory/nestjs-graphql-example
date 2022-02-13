import { MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

export function upperDirectiveTransformer(schema: GraphQLSchema, directiveName: string): GraphQLSchema {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			if (
				fieldConfig.astNode &&
				fieldConfig.astNode.directives &&
				fieldConfig.astNode.directives[0].name.value === directiveName
			) {
				const { resolve = defaultFieldResolver } = fieldConfig
				fieldConfig.resolve = async function (source, args, context, info) {
					const result = await resolve(source, args, context, info)
					if (typeof result === 'string') {
						return result.toUpperCase()
					}
					return result
				}
				return fieldConfig
			}
		},
	})
}
