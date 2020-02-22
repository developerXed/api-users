import jwt from 'jsonwebtoken';

export const VerifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No Authorization' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = await jwt.verify(token, 'secret');
        req.user = decoded.data;
        next();
    }
    catch (ex) {
        return res.status(401).json({ message: 'Token expired', token: null })
    }
}
