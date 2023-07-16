# sequelize-id-as-null-in-query

This issue is mostly out of the extension’s control due to the `.sync()` code being fully handled by sequelize.
The main problem is the sqlite dialect in sequelize which doesn't handles autoincrements for strings yet (related issue: https://github.com/sequelize/sequelize/issues/969)

Found two solutions of it:
Specifying the generated prop based on test environment like this in the model's property definition:
```
generated: typeof global.it === 'function' ? false : true,
```
(or using [detect-mocha](https://www.npmjs.com/package/detect-mocha))
But using this will require this to be changed in all models.

2. Specifying a beforeDefine hook in the test-helper file like this:
```ts
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
```

Both solves the issue.
Here’s an example implementation:
https://github.com/shubhamp-sf/sequelize-id-as-null-in-query/blob/main/src/__tests__/acceptance/test-helper.ts#L25:L48
