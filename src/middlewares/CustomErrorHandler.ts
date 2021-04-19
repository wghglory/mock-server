import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: () => any) {
    if (error) {
      console.log(error);
    }
    next();
  }
}

// // usage:
// createExpressServer({
//   middlewares: [__dirname + '/middlewares/**/*.ts'],
//   defaultErrorHandler: false, // disable default error handler, only if you have your own error handler
// }).listen(3000);
