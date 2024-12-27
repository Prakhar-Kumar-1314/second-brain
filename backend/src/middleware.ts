import zod from 'zod'
import { User } from './db';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const userValidation = (req: Request, res: Response, next: NextFunction) => {
    const {username, password, firstName, lastName} = req.body;

    try {

        zod.object({
            username: zod.string().email(),
            passowrd: zod.string().min(6),
            firstName: zod.string(),
            lastName: zod.string()
        }).parse({username, password, firstName, lastName})
        next();

    } catch (err: unknown) {
        res.status(411).json({
            msg: 'Incorrect Inputs',
            error: err instanceof Error ? err.message : String(err)
        })
    }
}

const userExistsSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    try {

        const exists = await User.findOne({ username });

        if (exists) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }
        next();

        
    } catch (err: unknown) {
        res.status(411).json({
            msg: "User not found",
            error: err instanceof Error ? err.message : String(err)
        })
    }
}

const userExistsSignIn = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;

    try {

        const exists = await User.find({username, password})
        if (!exists) {
            return res.status(400).json({
                msg: "User does not exist"
            })
        }
        next();

    } catch (err) {
        res.status(500).json({
            msg: "Error",
            error: err instanceof Error ? err.message : String(err)
        })
    }
}

const userValidationSignIn = (req: Request, res: Response, next: NextFunction) => {
    const {username , password} = req.body;

    try {

        zod.object({
            username: zod.string().email(),
            password: zod.string().min(6)
        }).parse({username, password});
        next();

    } catch(err) {
        res.status(411).json({
            msg: "incorrect inputs",
            error: err instanceof Error ? err.message : String(err)
        })
    }
}

const userMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, "SecondBrain")

    if (decoded) {
        // @ts-ignore
        req.userId = decoded.userId
        next();
    } else{
        res.status(411).json({
            error: "You are not logged in"
        })
    }
}

export {
    userExistsSignIn,
    userExistsSignUp,
    userValidation,
    userValidationSignIn,
    userMiddleWare
}