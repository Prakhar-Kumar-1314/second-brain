import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser';
import cors from 'cors'
import { userExistsSignIn, userExistsSignUp, userMiddleWare, userValidation, userValidationSignIn } from './middleware';
import { ContentModel, LinkModel, User } from './db';
import { random } from './utlils';
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

app.post("/api/v1/content", userMiddleWare, async (req, res) => {

    const {link, type, title} = req.body;
    
    try {
        const content = await ContentModel.create({
            link: link,
            type,
            title: title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        })

        if (content) {
            res.status(200).json({
                msg: "Content added successfully"
            })
        } else {
            res.status(411).json({
                msg: "Content couldn't be added"
            })
        }
    } catch(err) {
        res.status(500).json({
            error: err instanceof Error ? err.message : String(err)
        })
    }
})

app.get("/api/v1/content", async (req, res) => {

try {
        //@ts-ignore
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: userId
        }).populate("userId", "username")
    
        if (content) {
            res.status(200).json({
                content
            })
        } else {
            res.status(411).json({
                msg: "Content not found"
            })    
        }

} catch (err) {
    res.status(400).json({
        error: err instanceof Error ? err.message : String(err)
    })
}
})

app.post("/api/v1/brain/share", userMiddleWare, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const { share } = req.body;

    try {
        if (share) {
            const existingLink = await LinkModel.findOne({
                userId: userId
            })
            if (existingLink) {
                res.status(200).json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userid: userId,
                hash: hash
            })
            res.json({hash})
        } else {
            await LinkModel.deleteOne({userId: userId});
            res.json({message: "Removed Link"})
        }
    } catch(err) {
        res.status(500).json({
            error: err instanceof Error ? err.message : String(err)
        })
    } 
})

app.get("/api/v1/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({
            message: "Invalid link"
        })
        return;
    }
    const content = await ContentModel.find({userId: link.userId});
    const user = await User.findOne({_id: link.userId});

    if (!user) {
        res.status(404).json({
            message: "User not found"
        })
    }
    res.json({
        username: user?.username,
        content
    })
})

app.delete(".api/v1/content", async (req, res) => {

    try {
        //@ts-ignore
        const userId = req.userId
        const contentId = req.body.contentId
        const content = await ContentModel.deleteMany({
            contentId,
            userId: userId
        })

        if (content) {
            res.status(200).json({
                msg: "Content delted successfully"
            })
        } else {
            res.status(411).json({
                msg: "Content not found"
            })
        }
    } catch(err) {
        res.status(500).json({
            error: err instanceof Error ? err.message : String(err)
        })
    }
    
})

app.listen(port, () => {
    console.log(`Backend works at port ${port}`);
})