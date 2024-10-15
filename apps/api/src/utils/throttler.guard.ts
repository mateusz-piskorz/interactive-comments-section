import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { TsRestException } from '@ts-rest/nest';
import { AppRoute } from '@ts-rest/core';

const ttl = 60000;

export const ThrottlerGuard = (
  action:
    | 'create-comment'
    | 'update-comment'
    | 'remove-comment'
    | 'like-comment',
  tsRoute: AppRoute
) => {
  @Injectable()
  class ThrottlerGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const dateNow = Date.now();
      const { session } = context.switchToHttp().getRequest();

      if (!session.throttler) {
        session.throttler = {};
      }
      const lastTimeUsed = session.throttler[action];

      if (lastTimeUsed) {
        const diff = dateNow - lastTimeUsed;
        if (diff < ttl) {
          throw new TsRestException(tsRoute, {
            status: 403,
            body: {
              message: `You can perform ${action} action once every 1 minute`,
              remainingTime: ttl - diff,
            },
          });
        }
      }

      session.throttler[action] = dateNow;

      return true;
    }
  }

  const guard = mixin(ThrottlerGuardMixin);
  return guard;
};
