import { FilterQuery, FindOptions, Loaded } from '@mikro-orm/core'
import { EntityRepository } from '@mikro-orm/postgresql'
import { PlayerEntity } from './entities/player.entity'

export class PlayerRepository extends EntityRepository<PlayerEntity> {
	async find<P extends string = never>(
		where: FilterQuery<PlayerEntity> = {},
		options?: FindOptions<PlayerEntity, P>,
	): Promise<Loaded<PlayerEntity, P>[]> {
		console.log('hi this is custom repository class method')
		return super.find(where, options)
	}
}
