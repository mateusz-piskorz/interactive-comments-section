import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  HttpException,
} from '@nestjs/common';

const timeStorage = {};
const ttl = 60000;

export const ThrottlerGuard = (storageName: string) => {
  @Injectable()
  class ThrottlerGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const dateNow = Date.now();
      const request = context.switchToHttp().getRequest();

      const userId = request.user.id;

      if (!timeStorage[storageName]) timeStorage[storageName] = {};

      const lastTimeUsed = timeStorage[storageName][userId];

      if (lastTimeUsed) {
        const diff = dateNow - lastTimeUsed;
        if (diff < ttl) {
          throw new HttpException(
            {
              message: 'You can only use this action once every 1 minute',
              remainingTime: ttl - diff,
            },
            429,
          );
        }
      }

      timeStorage[storageName][userId] = dateNow;

      return true;
    }
  }

  const guard = mixin(ThrottlerGuardMixin);
  return guard;
};
