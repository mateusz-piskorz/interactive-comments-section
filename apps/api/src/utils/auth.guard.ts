import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('request.session:@@');
    console.log(request.session);
    console.log(request.session.id);
    if (!request.session.user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
