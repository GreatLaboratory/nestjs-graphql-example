import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/domain/posts/models/post.model'
import { Human } from '../../../common/models/human.model'

@ObjectType({ implements: () => [Human] })
export class Author implements Human {
	id: number
	firstName: string
	lastName: string

	@Field(() => [Post])
	posts: Post[]
}
