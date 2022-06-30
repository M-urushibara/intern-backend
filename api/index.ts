import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { signJwt, verifyJwt } from './repositories/jwt'
import { createUserUseCase, readUserUseCase } from './usecases/user';
import { logInUserUseCase } from './usecases/login';

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;

//user登録
app.post(
  '/create/user',
  async (req:Request, res:Response) => {
    const createResult = await createUserUseCase(
			req.body.name,
			req.body.password,
		);
    const token = await signJwt(createResult);
    res.json(token);
  }
);

//ユーザー情報取得これはうごきません．
app.get( 
  '/read/user',
  async (req:Request, res:Response) => {
    let token = '';
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];

        const users = await verifyJwt(token);
        console.log(verifyJwt(token));
        res.json(users);
    };

  }
);

//ログイン機能 データベースにあったらトークン返す．
app.post(
  '/login',
  async (req:Request, res:Response) => {
    const logInResult = await logInUserUseCase (
      req.body.name,
      req.body.password,
    );

    const token = await signJwt(logInResult);
    const result = {
      id: logInResult,
      token: token,
    };
    res.json(result);
  }
);



app.listen(port, () => console.log('Example app listening'));