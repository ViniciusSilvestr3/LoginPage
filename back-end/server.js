import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'
import { PrismaClient } from './generated/prisma/index.js'
import cors from 'cors'
export const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/usuarios', publicRoutes)
app.use('/usuarios', auth, privateRoutes)
// 3 Rotas
// Cadastro, Login, Listar Usuários

app.listen(3000, ()=> console.log("Servidor Rodando =)"))
