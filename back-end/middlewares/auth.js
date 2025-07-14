import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
const auth = (req, res, next) =>{
  const token = req.headers.authorization
  if(!token){
    return res.status(401).json({message: 'Acesso negado'})
  }
  try{
  
    const decoded = jwt.verify(token.replace('Bearer ', ''),process.env.JWT_SECRET)

    req.userId = decoded.id

  }catch (error){
    return res.status(401).json({message: 'Token inválido' + error.message})
  }
  next()

}

export default auth