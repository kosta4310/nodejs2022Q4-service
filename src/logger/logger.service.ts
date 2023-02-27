import {
  Injectable,
  Scope,
  ConsoleLogger,
  ConsoleLoggerOptions,
} from '@nestjs/common';
import { getLogLevels } from './utils/getLogLevel';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  constructor(context: string, options: ConsoleLoggerOptions) {
    super(context, {
      ...options,
      logLevels: getLogLevels(),
    });
  }
}
