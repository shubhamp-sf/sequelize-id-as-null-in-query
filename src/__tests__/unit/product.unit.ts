import {SequelizeIdAsNullInQueryApplication} from '../..';
import {ProductRepository} from '../../repositories';
import {setupApplication} from '../acceptance/test-helper';

describe('Products', function () {
  let app: SequelizeIdAsNullInQueryApplication;
  let productRepo: ProductRepository;
  before('setupApplication', async () => {
    ({app} = await setupApplication());
    productRepo = await app.getRepository(ProductRepository);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    await productRepo.syncSequelizeModel();
  });

  it('creates', async () => {
    const createdProduct = await productRepo.create({
      id: '1',
      name: 'Phone',
      price: 10000,
    });
    console.log(createdProduct);
  });
});
