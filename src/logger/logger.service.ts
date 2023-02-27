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

  log(message: string) {
    super.log.apply(this, [message]);
  }

  error(message: string) {
    super.error.apply(this, [message]);
  }

  warn(message: string) {
    super.warn.apply(this, [message]);
  }

  debug(message: string) {
    super.debug.apply(this, [message]);
  }

  verbose(message: string) {
    super.debug.apply(this, [message]);
  }
}
