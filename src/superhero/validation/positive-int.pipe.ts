import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * Custom Validation pipe for both numeric input as well as positive,
 * 
 * use cases for method argument expected be positive and numeric.
 * i.e. id field from path param.
 * 
 * Main reason to create a custom pipe:
 * 
 * to have more control over param or input, and less pollution in controller :)/
 */
@Injectable()
class ParsePositiveIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }
    if (val < 1) {
      throw new BadRequestException('Id must be a positive integer');
    }

    return val;
  }
}

export default ParsePositiveIntPipe;
