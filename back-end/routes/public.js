import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../server.js";
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router();
//Cadastro

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });
    res.status(201).json(userDB);
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente." });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;
    //Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({where:{email: userInfo.email}})
    // Verifica se o usuário existe dentro do banco
    if(!user){
      return res.status(404).json({message: "Usuário não encontrado."})
    }
    const isMatch = await bcrypt.compare(userInfo.password, user.password)
    // Verifica se a senha do usuário é válida
    if(!isMatch){
      return res.status(400).json({message: 'Senha inválida'})
    }

    //Gerar o Token JWT
    
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.status(200).json(token)
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente." + error.message });
  }
});

export default router;
