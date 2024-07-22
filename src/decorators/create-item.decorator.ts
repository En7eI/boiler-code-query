import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const CreateItem = createParamDecorator(
  (value: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    // Transform body to DTO instance
    const dto = plainToInstance(value, body, { excludeExtraneousValues: true });

    // Validate the DTO instance
    const errors = validateSync(dto, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors}`);
    }

    return dto;
  },
);
