import express from 'express'
import { prisma } from "../server.js";

const router = express.Router()
router.get('/listar-usuarios', async (req, res)=>{

try{

  const users = await prisma.user.findMany({omit: {password: true} })
  res.status(200).json({message: 'Usuários listados com sucesso', users})


}catch (error){
  res.status(500).json({message: 'Falha no servidor'})
}

})

export default router