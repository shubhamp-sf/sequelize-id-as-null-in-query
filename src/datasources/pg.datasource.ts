import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {SequelizeDataSource} from '@loopback/sequelize';

const config = {
  name: 'pg',
  connector: 'postgresql',
  url: 'postgres://postgres:super-secret@localhost:5007/postgres',
  schema: 'main',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgDataSource
  extends SequelizeDataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pg';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pg', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
