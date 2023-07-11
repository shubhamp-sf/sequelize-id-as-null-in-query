import {inject} from '@loopback/core';
import {SequelizeCrudRepository} from '@loopback/sequelize';
import {PgDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepository extends SequelizeCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(@inject('datasources.pg') dataSource: PgDataSource) {
    super(Product, dataSource);
  }
}
