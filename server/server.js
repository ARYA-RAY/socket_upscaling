import connectdb from '../server/db/connectdb.js'
import authRouter from './routes/authRouter.js'

import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5000

// app.get("/", (req,res) => {
//     res.send("Hello")
// })

app.use("/api/auth", authRouter);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    connectdb()
    console.log("Server on port `{$PORT}`")
})