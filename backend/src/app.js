import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// Routes
app.get('/',(req,res)=>{
    res.send("API is running");
})
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

export default app;