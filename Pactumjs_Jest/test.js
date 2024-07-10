const { handler,spec } = require('pactum');
const { it, describe } = require('@jest/globals');
const logger = require('./logger');

describe('JSONPlaceholder API Tests', () => {

  it('should get a list of todos', async () => {
    logger.info('Sending GET request to /todos')
    const response = await spec()
      .get('https://jsonplaceholder.typicode.com/todos')
      .expectStatus(200);
      logger.info(`Received response: ${JSON.stringify(response.body)}`);
  });

  it('should get a specific todo', async () => {
    await spec()
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .expectStatus(200)
      .expectJsonLike({
        id: 1,
      });
  });

  it('should create a new todo', async () => {
   const response =  await spec()
      .post('https://jsonplaceholder.typicode.com/todos')
      .withHeaders('Content-Type', 'application/json')
      .withJson({
        title: 'foo',
        completed: false,
        userId: 1
      })
      .expectStatus(201)
      .expectJsonLike({
        title: 'foo',
        completed: false,
        userId: 1
      });
    logger.info(`Received response: ${JSON.stringify(response.body)}`);
  });

});
