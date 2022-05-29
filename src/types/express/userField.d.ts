import { UserFieldDto } from './userField.dto';

declare global {
  namespace Express {
    interface Request {
      user?: UserFieldDto;
    }
  }
}
