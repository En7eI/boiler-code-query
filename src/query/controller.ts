import { Controller, Get, Param } from '@nestjs/common';
import { QueryService } from './service';
import { QueryParams } from '../decorators/query.decorator';

@Controller('dynamic')
export class DynamicController {
  constructor(private readonly queryService: QueryService) {}

  @Get('prisma/:model')
  async getWithPrisma(
    @QueryParams() queryParams, 
    @Param('model') model,
  ) {
    return this.queryService.findWithPrisma(model, queryParams);
  };

  @Get('elasticsearch/:index')
  async searchWithElasticsearch(
    @Param('index') index,
    @QueryParams() queryParams,
  ) {
    return this.queryService.searchWithElasticsearch(index, queryParams);
  };
}