import { Router, Request, Response } from 'express';
import User, { userLogginModel } from './../../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRoute = Router();

loginRoute.post('/', async (req : Request, res : Response) => {
  try{
    const {email, password} = req.body;
    const userEmail = email.toLowerCase();
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(400).send({ msg: 'Usuario no existe en la base de datos' });
    }
    //const isPasswordCorrect = await bcrypt.compare(user.password, password);
    if (password!=user.password){//isPasswordCorrect) {
      return res.status(400).send({ msg: `Contraseña '${password}' inválida para ${email}:${user.password}` });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret');
    res.send({ token, user });
  }
  catch(error){
    console.error(`Error en user.route.ts:  \n   ${error}`);
    console.log(`Error en user.route.ts:  \n   ${error}`);
  }
});
