import  express  from "express";
import cors from "cors"
import postRoutes from "./Routes/posts.js"
import userRoutes from "./Routes/users.js"
import authRoutes from "./Routes/auth.js"
import cookieParser from "cookie-parser"
import multer from "multer"
const app = express()

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
     
      cb(null,Date.now()+file.originalname)
    }
  })
const upload = multer({ storage})

app.post('/api/upload', upload.single('file'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const file= req.file
    res.status(200).json(file.filename)
  })
  
app.use(cookieParser())
app.use("/api/posts",postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.listen(8000,()=>{
    console.log("server is running")
})