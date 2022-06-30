import UserRepository from '../repositories/user'


const logInUserUseCase = async (
    name: string,
    password: string,
) => {
    const userRepository = new UserRepository();
    const logInResult = await userRepository.findName(name);
    if(logInResult.id !== null){
        if (password === logInResult.password){
            return logInResult.id; 
        };
    };
}

export {logInUserUseCase}