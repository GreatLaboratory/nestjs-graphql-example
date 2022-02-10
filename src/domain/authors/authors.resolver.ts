import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Post } from '../posts/models/post.model'
import { PostsService } from '../posts/posts.service'
import { AuthorsService } from './authors.service'
import { GetAuthorArgsDto } from './dto/get-author.args'
import { Author } from './models/author.model'

@Resolver(() => Author)
export class AuthorsResolver {
	constructor(private authorsService: AuthorsService, private postsService: PostsService) {}

	@Query(() => Author)
	async getAuthorById(@Args('id', { type: () => Int }) id: number): Promise<Author> {
		return await this.authorsService.findOneById(id)
	}

	@Query(() => Author)
	async getAuthorByName(@Args() args: GetAuthorArgsDto): Promise<Author> {
		return await this.authorsService.findOneByName(args)
	}

	@ResolveField('posts', () => [Post])
	async getPosts(@Parent() author: Author): Promise<Post[]> {
		return await this.postsService.findAll(author.id)
	}
}
