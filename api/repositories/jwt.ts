import jwt from 'jsonwebtoken';

const signJwt = (id: number) => {
    const SECRET_KEY = 'abcdefg';
    const payload = { userid: id };
    const option = { expiresIn: '2 days' };
    const token = jwt.sign(payload, SECRET_KEY, option);
    return token;
}

const verifyJwt = (token: string) => {
    const SECRET_KEY = 'abcdefg';
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    return decoded;
}

export { signJwt, verifyJwt }
