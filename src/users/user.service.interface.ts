import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entiry';

export interface IUserService {
  createUser: (userRegisterDTO: UserRegisterDTO) => Promise<User | null>;
  validateUser: (userLoginDTO: UserLoginDTO) => Promise<boolean>;
}
