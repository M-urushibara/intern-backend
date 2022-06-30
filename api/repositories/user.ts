import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserRepository {

    //データベースにnameとpasswordを登録
    async create(userName: string, userPassword: string){
        const users = await prisma.user.create({
            data: {
                name: userName,
                password: userPassword,
            },
        });
        return users.id;
    };

        //データベースにnameとpasswordを登録
    async read(userId: number){
        const users = await prisma.user.findUnique({
            where: {
				id: userId,
			},           
			select: {
				name: true,
                password: true,
			}
        });
        return users;
    };

 
        //データベースにnameとpasswordを登録
        async findName(name: string){
            const users = await prisma.user.findUnique({
                where: {
                    name: name,
                },           
                select: {
                    id: true,
                    name: true,
                    password: true,
                }
            });
            return users;
        };   

}