import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { LoadStrategy } from '@mikro-orm/core'

const config: Options = {
	type: 'postgresql',
	host: process.env.DATABASE_HOST,
	port: 5432,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PWD,
	dbName: process.env.DATABASE_NAME,
	schema: process.env.DATABASE_SCHEMA,
	entities: ['dist/**/*.entity.js'],
	entitiesTs: ['src/**/*.entity.ts'],
	debug: true,
	loadStrategy: LoadStrategy.JOINED,
	highlighter: new SqlHighlighter(),
	metadataProvider: TsMorphMetadataProvider,
	registerRequestContext: false,
	migrations: {
		path: 'dist/migrations',
		pathTs: 'src/migrations',
	},
}

export default config
