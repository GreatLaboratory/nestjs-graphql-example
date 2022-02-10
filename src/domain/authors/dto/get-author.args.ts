import { ArgsType, Field } from '@nestjs/graphql'
import { PaginationArgsDto } from '../../../common/dto/pagination.args'

@ArgsType()
export class GetAuthorArgsDto extends PaginationArgsDto {
	@Field()
	firstName: string

	@Field()
	lastName: string
}
