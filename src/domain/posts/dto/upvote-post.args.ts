import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpvotePostArgsDto {
	@Field(() => Int)
	postId: number
}
