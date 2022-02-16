import { Field, ObjectType } from '@nestjs/graphql'
import { Human } from '../../../common/models/human.model'
import { Post } from '../../posts/models/post.model'

@ObjectType({ implements: () => [Human] })
export class Author implements Human {
	id: number
	firstName: string
	lastName: string

	@Field(() => [Post])
	posts: Post[]
}
