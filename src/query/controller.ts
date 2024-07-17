import { Controller, Get, Param } from '@nestjs/common';
import { QueryService } from '../query/service';
import { QueryParams } from '../decorators/query.decorator';
import { ModelName } from '../prisma/type'

@Controller('dynamic')
export class DynamicController {
  constructor(private readonly queryService: QueryService) {}

  @Get('prisma/:model')
  async getWithPrisma(
    @QueryParams() queryParams,
    @Param('model') model: string,
  ) {
    return this.queryService.findWithPrisma(model as ModelName, queryParams);
  }

  @Get('elasticsearch/:index')
  async searchWithElasticsearch(
    @QueryParams() queryParams,
    @Param('index') index: string,
  ) {
    return this.queryService.searchWithElasticsearch(index, queryParams);
  }
}