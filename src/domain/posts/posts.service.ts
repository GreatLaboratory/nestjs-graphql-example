import { Injectable } from '@nestjs/common'
import { Post, PostColor } from './models/post.model'

@Injectable()
export class PostsService {
	private votes = 77
	async findAll(authorId: number): Promise<Post[]> {
		return [
			{
				id: 1,
				title: `query test title authorId: ${authorId}`,
				votes: this.votes,
				color: PostColor.RED,
				createdAt: new Date(),
			},
		]
	}

	async upvotePost(postId: number): Promise<Post> {
		return {
			id: postId,
			title: 'mutation test title',
			votes: this.votes++,
			color: PostColor.GREEN,
			createdAt: new Date(),
		}
	}
}
