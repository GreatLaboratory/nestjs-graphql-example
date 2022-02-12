import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import * as path from 'path'
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
		}),
	],
})
export class AppModule {}
