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
			autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
		}),
	],
})
export class AppModule {}
