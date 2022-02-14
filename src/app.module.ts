import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import * as path from 'path'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'
import { loggerMiddleware } from './common/middlewares/field-logger.middleware'
import { AuthorsModule } from './domain/authors/authors.module'
import { PostsModule } from './domain/posts/posts.module'

@Module({
	imports: [
		AuthorsModule,
		PostsModule,
		GraphQLModule.forRoot({
			subscriptions: {
				'subscriptions-transport-ws': true,
				'graphql-ws': true,
			},
			autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
			buildSchemaOptions: {
				fieldMiddleware: [loggerMiddleware], // 글로벌하게 적용
			},
		}),
	],
})
export class AppModule {}
