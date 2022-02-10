import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgsDto {
	@Field(() => Int, { nullable: true })
	limit?: number

	@Field(() => Int, { nullable: true })
	offset?: number
}
