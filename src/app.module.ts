import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import * as path from 'path'
import { AuthorsModule } from './domain/authors/authors.module'

@Module({
	imports: [
		AuthorsModule,
		GraphQLModule.forRoot({
			autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
		}),
	],
})
export class AppModule {}
