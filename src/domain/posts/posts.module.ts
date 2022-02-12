import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'

@Module({
	exports: [PostsService],
	providers: [
		PostsService,
		PostsResolver,
		{
			provide: 'PUB_SUB',
			useValue: new PubSub(),
		},
	],
})
export class PostsModule {}
