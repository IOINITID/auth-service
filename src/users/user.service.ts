import { injectable } from 'inversify';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entiry';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
  public async createUser({ email, name, password }: UserRegisterDTO): Promise<User | null> {
    const newUser = new User(email, name);
    await newUser.setPassword(password);

    // Проверка что пользователь есть

    return null;
  }

  public async validateUser(userLoginDTO: UserLoginDTO): Promise<boolean> {
    return true;
  }
}
