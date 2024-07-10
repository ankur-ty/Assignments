const { spec } = require('pactum');
const { it, describe, beforeEach } = require('@jest/globals');
const logger = require('./logger');
const BASE_URL = require('./handlers');  

describe('JSONPlaceholder API Tests', () => {

  beforeEach(() => {
    console.info('Starting a new test');
  });

  it('should get a list of todos', async () => {
    await spec('get todos');
  });

  it('should get a specific todo', async () => {
    await spec('get todo by id', { id: 1 })
      .expectJsonLike({
        id: 1,
      });
  });

  it('should create a new todo', async () => {
    await spec('create todo', {
      body: {
        title: 'foo',
        completed: false,
        userId: 1
      }
    })
    .expectJsonLike({
      title: 'foo',
      completed: false,
      userId: 1
    });
  });

  it('should capture the ID of the first todo and get its details', async () => {
    const firstTodoId = await spec()
      .get(`${BASE_URL}/todos`)
      .expectStatus(200)
      .returns('#firstTodoId');

    const response = await spec('get todo by id', { id: firstTodoId });
    logger.info(`Response received: ${JSON.stringify(response.body)}`);
  });

  it('should create a new todo with dynamic timestamp and authorization', async () => {
    const response = await spec()
      .post(`${BASE_URL}/todos`)
      .withHeaders('Authorization', '$F{GetAuthToken}')
      .withJson({
        title: 'foo',
        completed: false,
        userId: 1,
        createdAt: '$F{GetTimeStamp}'
      })
      .expectStatus(201)
      .expectJsonLike({
        title: 'foo',
        completed: false,
        userId: 1
      });

    logger.info(`Response received: ${JSON.stringify(response.body)}`);
  });

});
