import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const QueryParams = createParamDecorator(
  (value: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    // Transform query params to DTO instance
    const dto = plainToInstance(value, query, { excludeExtraneousValues: true });

    // Validate the DTO instance
    const errors = validateSync(dto, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors}`);
    }

    return dto;
  },
);
