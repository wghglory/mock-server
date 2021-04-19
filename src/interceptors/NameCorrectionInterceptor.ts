// createExpressServer({
//   controllers: [__dirname + '/controllers/**/*.ts'],
//   middlewares: [__dirname + '/middlewares/**/*.ts'],
//   interceptors: [__dirname + '/interceptors/**/*.ts'],
// }).listen(3000);

import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

export class NameCorrectionInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return content.replace(/Mike/gi, 'Michael');
  }
}

// Usage: UserController
// @Get("/users")
// @UseInterceptor(NameCorrectionInterceptor)
// getOne(@Param("id") id: number) {
//     return "Hello, I am Mike!"; // client will get a "Hello, I am Michael!" response.
// }
