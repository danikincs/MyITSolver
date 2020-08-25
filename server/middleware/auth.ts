import { verify } from 'jsonwebtoken';

export function auth(req : any, res : any, next: any) {
    try {
        const token = (req.body && req.body.token) || (req.query && req.query.token);
        const decoded = verify(token, process.env.JWT_KEY);        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};