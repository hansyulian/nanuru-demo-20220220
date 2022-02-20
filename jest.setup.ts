import models from 'backend/models';
jest.setTimeout(100000); // eslint-disable-line no-undef

beforeAll(() => {
});
afterAll(async () => {
  await models.sequelize.close();
});
