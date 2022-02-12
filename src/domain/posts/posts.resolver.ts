import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { UpvotePostArgsDto } from './dto/upvote-post.args'
import { Post } from './models/post.model'
import { PostsService } from './posts.service'

@Resolver()
export class PostsResolver {
	constructor(private postsService: PostsService, @Inject('PUB_SUB') private pubSub: PubSub) {}

	@Mutation(() => Post)
	async upvotePost(@Args('upvotePostArgs') upvotePostArgs: UpvotePostArgsDto): Promise<Post> {
		const { postId } = upvotePostArgs
		const newPost: Post = await this.postsService.upvotePost(postId)
		this.pubSub.publish('upvotePostEvent', { upvotePostEvent: newPost }) // publish event
		return newPost
	}

	@Subscription(() => Post, {
		filter: (payload, args) => payload.upvotePostEvent.votes < args.maxVotes,
	})
	upvotePostEvent(@Args('maxVotes', { type: () => Int }) maxVotes: number) {
		return this.pubSub.asyncIterator('upvotePostEvent')
	}
}
