import 'reflect-metadata'; // this shim is required, must before createExpressServer

import { Action, createExpressServer } from 'routing-controllers';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  routePrefix: '/api/v1',
  controllers: [__dirname + '/controllers/*.ts'],
  middlewares: [__dirname + '/middlewares/*.ts'],
  interceptors: [__dirname + '/interceptors/*.ts'],
  authorizationChecker: async (action: Action, roles: string[]) => {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    // demo code:
    const token = action.request.headers['authorization'];
    // console.log(token);
    return true;
  },
});

app.listen(9999, () => {
  console.log('server at http://localhost:9999');
});
