import { Injectable } from '@nestjs/common'
import { GetAuthorArgsDto } from './dto/get-author.args'
import { Author } from './models/author.model'

@Injectable()
export class AuthorsService {
	async findOneById(id: number): Promise<Author> {
		return {
			id,
			lastName: 'Kim',
			firstName: 'Myung-gwan',
			posts: [],
		}
	}

	async findOneByName(args: GetAuthorArgsDto): Promise<Author> {
		const { lastName, firstName } = args
		return {
			id: 333,
			lastName,
			firstName,
			posts: [],
		}
	}
}
