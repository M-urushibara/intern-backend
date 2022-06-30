import { join } from 'path';
import UserRepository from '../repositories/user'

const createUserUseCase = async (
	name: string,
	password: string,
) => {
    const userRepository = new UserRepository();
    const createUpResult = await userRepository.create(name, password);
	return await createUpResult;
    };

const readUserUseCase = async (userId:number) => {
    const userRepository = new UserRepository();
    const readResult = await userRepository.read(userId);
	return await readResult;
};




export{ createUserUseCase, readUserUseCase };