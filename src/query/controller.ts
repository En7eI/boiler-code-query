import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { QueryService } from '../query/service';
import { QueryParamsDto } from '../dto/query.params.dto';
import { CreateItemDto } from '../dto/create.dto';
import { UpdateItemDto } from '../dto/update.dto';
import { QueryParams } from '../decorators/query.decorator';
import { CreateItem } from '../decorators/create-item.decorator';
import { UpdateItem } from '../decorators/update-item.decorator';
import { ModelName } from '../prisma/type';

@Controller('dynamic')
export class DynamicController {
  constructor(private readonly queryService: QueryService) {}

  @Get('prisma/:model')
  async getWithPrisma(@QueryParams(QueryParamsDto) queryParams: QueryParamsDto, @Param('model') model: string) {
    return this.queryService.findWithPrisma(model as ModelName, queryParams);
  }

  @Get('elasticsearch/:index')
  async searchWithElasticsearch(@QueryParams(QueryParamsDto) queryParams: QueryParamsDto, @Param('index') index: string) {
    return this.queryService.searchWithElasticsearch(index, queryParams);
  }

  @Post('prisma/:model')
  async createWithPrisma(@CreateItem(CreateItemDto) createItemDto: CreateItemDto, @Param('model') model: string) {
    return this.queryService.createWithPrisma(model as ModelName, createItemDto);
  }

  @Put('prisma/:model/:id')
  async updateWithPrisma(@UpdateItem(UpdateItemDto) updateItemDto: UpdateItemDto, @Param('model') model: string, @Param('id') id: string) {
    return this.queryService.updateWithPrisma(model as ModelName, id, updateItemDto);
  }
}
