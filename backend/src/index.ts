import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser';
import cors from 'cors'
import { userExistsSignIn, userExistsSignUp, userMiddleWare, userValidation, userValidationSignIn } from './middleware';
import { User } from './db';
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/v1/signup", userValidation, async (req, res) => {
    const {username, password, firstName, lastName} = req.body;
    
    try {

        const user = await User.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })

        const userId = user._id;

        const token = jwt.sign({userId: userId}, 'SecondBrain');

        res.status(200).json({
            msg: "User created successfully",
            token : token
        })

    } catch(err) {
        res.status(500).json({
            error: err instanceof Error ? err.message : String(err)
        })
    }
})

app.post("/api/v1/signin", userValidationSignIn, async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({username, password});

      if (user) {
        const token = jwt.sign({ userId: user._id }, "SecondBrain");
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }

    } catch(err) {
        res.status(411).json({
            error: err instanceof Error ? err.message : String(err)
        })
    }
})

app.post("/api/v1/content", userMiddleWare, (req, res) => {

    const {link, type} = req.body;
     

})

app.get("/api/v1/content", (req, res) => {

})
app.post("/api/v1/share", (req, res) => {

})
app.get("/api/v1/:shareLink", (req, res) => {

})

app.delete(".api/v1/content", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Backend works at port ${port}`);
})