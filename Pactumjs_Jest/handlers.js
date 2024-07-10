const { handler } = require('pactum');
const logger = require('./logger');


handler.addSpecHandler('get todos', (ctx) => {
    const { spec } = ctx;
    logger.info('Sending GET request to /todos');
    spec.get('https://jsonplaceholder.typicode.com/todos');
    spec.expectStatus(200);
    
  });

  handler.addSpecHandler('get todo by id', (ctx) => {
    const { spec } = ctx;
    const id = ctx.data.id;
    logger.info(`Sending GET request to /todos/${id}`);
    spec.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    spec.expectStatus(200);
  });
  
  handler.addSpecHandler('create todo', (ctx) => {
    const { spec } = ctx;
    const body = ctx.data.body;
    logger.info('Sending POST request to /todos with body: ' + JSON.stringify(body));
    spec.post('https://jsonplaceholder.typicode.com/todos');
    spec.withHeaders('Content-Type', 'application/json');
    spec.withJson(body);
    spec.expectStatus(201);
  });

  handler.addCaptureHandler('firstTodoId', (ctx) => {
    return ctx.res.json[0].id;
  });

  handler.addDataFuncHandler('GetTimeStamp', () => {
    return Date.now();
  });
  
  handler.addDataFuncHandler('GetAuthToken', () => {
    return 'Bearer some-mock-token';
  });

