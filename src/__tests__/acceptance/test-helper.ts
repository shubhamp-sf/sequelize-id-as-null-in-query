import {AnyObject} from '@loopback/repository';
import {SequelizeDataSourceConfig} from '@loopback/sequelize';
import {
  Client,
  createRestAppClient,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {DataTypes} from 'sequelize';
import {SequelizeIdAsNullInQueryApplication} from '../..';
import {PgDataSource} from '../../datasources';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new SequelizeIdAsNullInQueryApplication({
    rest: restConfig,
  });

  app.bind(`datasources.config.${PgDataSource.dataSourceName}`).to({
    name: 'pg',
    connector: 'sqlite3',
    database: 'test',
    file: ':memory:',
    sequelizeOptions: {
      hooks: {
        beforeDefine: (attributes, _options) => {
          for (const key in attributes) {
            const propDefinition = attributes[key] as AnyObject;
            if (
              propDefinition.autoIncrement === true &&
              propDefinition.type === DataTypes.STRING
            ) {
              Object.assign(attributes[key], {
                propDefinition,
                autoIncrement: false,
              });
            }
          }
        },
      },
    },
  } as SequelizeDataSourceConfig);

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: SequelizeIdAsNullInQueryApplication;
  client: Client;
}
