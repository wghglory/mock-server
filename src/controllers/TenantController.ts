import { ResourceNotFoundError } from '../ResourceNotFoundError';
import {
  Req,
  Res,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  QueryParam,
  JsonController,
  OnUndefined,
  Authorized,
} from 'routing-controllers';
import { Request, Response } from 'express';
import faker from 'faker';
import { sample } from 'lodash';
import { pageData, repeat } from '../utils';

@JsonController('/core/tenants')
export class TenantController {
  tenants: any;

  constructor() {
    this.tenants = repeat(this.generate, 45);
  }

  @Get('')
  @Authorized()
  getAll(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number) {
    return pageData(this.tenants, { limit, offset });
  }

  @Get('/:id')
  @OnUndefined(ResourceNotFoundError)
  getOne(@Param('id') id: string) {
    return this.tenants.find((t) => t.id === id);
  }

  @Post('/')
  post(@Body() user: any) {
    // @Body User model
    let data = JSON.stringify(user); // probably you want to install body-parser for express
    return 'User ' + data + ' !saved!';
  }

  @Put('/:id')
  put(@Param('id') id: number) {
    return 'User #' + id + ' has been putted!';
  }
  // @Put('/:id')
  // put(@Req() Req: Req) {
  //   return 'User #' + Req.params.id + ' has been putted!';
  // }

  @Patch('/:id')
  patch(@Req() req: Request) {
    return 'User #' + req.params.id + ' has been patched!';
  }

  @Delete('/:id')
  remove(@Req() req: Request) {
    return 'User #' + req.params.id + ' has been removed!';
  }

  generate = () => {
    const status = sample(['READY', 'PENDING_SUBSCRIBE', 'PENDING_CREATE', 'CREATED', 'NOT_SET']);
    let enabled = false;
    let serviceCount = 0;

    if (status === 'READY') {
      enabled = faker.datatype.boolean();

      if (enabled) {
        serviceCount = faker.datatype.number({ max: 20 }); // TODO: < service list global var
      }
    }

    return {
      name: faker.name.firstName(),
      fullName: faker.name.firstName(),
      id: faker.datatype.uuid(),
      enabled,
      lastModifiedDate: faker.date.recent(),
      platforms: {
        AZURE: {
          cloudTenantId: faker.datatype.uuid(),
          cloudPlatform: 'AZURE',
          timeline: {
            statusDescription: faker.lorem.sentence(),
            cloudTenantHealth: 'NORMAL',
            cloudIdentifier: faker.datatype.uuid(),
            subscriptionName: faker.commerce.productName(),
            tenantId: faker.datatype.uuid(),
            histories: ['officia anim laborum ad minim', 'labore', 'est ad laboris', 'consectetur et cillum'],
            links: [
              {
                type: faker.internet.domainWord(),
                url: faker.internet.url(),
              },
              {
                type: faker.internet.domainWord(),
                url: faker.internet.url(),
              },
            ],
            creationDate: faker.date.recent(),
            subscriptionId: faker.datatype.uuid(),
            startFlow: 'CREATE',
            status,
          },
        },
      },
      serviceCount,
      userCount: faker.datatype.number({ max: 100 }),
      deleteRequest: faker.lorem.word(),
      purgeState: faker.lorem.word(),
      source: 'VCD',
    };
  };
}
