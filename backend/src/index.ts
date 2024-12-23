import express from 'express'
const app = express();
const port = 3000;

app.post("/api/v1/signup", (req, res) => {

})

app.post("/api/v1/signin", (req, res) => {

})
app.post("/api/v1/content", (req, res) => {

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