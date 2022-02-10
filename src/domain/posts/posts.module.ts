import { Module } from '@nestjs/common'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'

@Module({
	exports: [PostsService],
	providers: [PostsService, PostsResolver],
})
export class PostsModule {}
