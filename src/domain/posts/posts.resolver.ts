import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UpvotePostArgsDto } from './dto/upvote-post.args'
import { Post } from './models/post.model'
import { PostsService } from './posts.service'

@Resolver()
export class PostsResolver {
	constructor(private postsService: PostsService) {}

	@Mutation(() => Post)
	async upvotePost(@Args('upvotePostArgs') upvotePostArgs: UpvotePostArgsDto): Promise<Post> {
		const { postId } = upvotePostArgs
		return this.postsService.upvotePost(postId)
	}
}
