import { Injectable } from '@nestjs/common'
import { Post } from './models/post.model'

@Injectable()
export class PostsService {
	async findAll(authorId: number): Promise<Post[]> {
		return [
			{
				id: authorId,
				title: 'test title',
				votes: 77,
			},
		]
	}
}
