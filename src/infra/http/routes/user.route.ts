import { Router, Request, Response } from 'express';
import User from './../../../models/user.model';
import Advance from './../../../models/advance.model';
import { NextFunction } from 'connect';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const userRoute = Router();
const jwt = require('jsonwebtoken');


userRoute.get('/', async (req : Request, res : Response) => {
    try {
      //const id = req.params.id;
      const user = await User.find();
      return res.json(user);
    }
    catch (err : any) {
      return res.status(500).json({ message: err.message });
    }
});
/**/
userRoute.post('/', async (req: Request, res: Response) => {
  try {    
    const { email  } = req.body; 
    if (!email) {  return res.status(400).json({ error: 'Se requiere un email válido' }); }
    const userEmail = email.toLowerCase(); // Convertir correo electrónico a minúsculas
    const user = new User({ ...req.body, email: userEmail });
    await user.save();

    const advance = new Advance({ _id: user._id });
    await advance.save();

    res.status(201).json({ user, advance });
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
});

userRoute.patch('/avatar', verificarToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { avatarPath  } = req.body; 
    if (!avatarPath) {  return res.status(400).json({ error: 'Se requiere un avatar válido' }); }
    const updatedUser = await User.findByIdAndUpdate( id, { $set: { avatarPath } }, { new: true } ).exec();
    if (updatedUser) { res.status(200).json({ message: 'Avatar actualizado correctamente', user: updatedUser }); } 
    else { res.status(404).json({ error: 'No se encontró el usuario' }); }
  } 
  catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) { res.status(500).json({ error: 'Error de base de datos al actualizar el usuario' }); } 
    else { res.status(500).json({ error: 'No se pudo actualizar el usuario' }); }
  }
});

userRoute.patch('/username', verificarToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username  } = req.body; 
    if (!username) {  return res.status(400).json({ error: 'Se requiere un nombre de usuario válido' }); }
    const updatedUser = await User.findByIdAndUpdate( id, { $set: { username } }, { new: true } ).exec();
    if (updatedUser) { res.status(200).json({ message: 'Nombre de usuario actualizado correctamente', user: updatedUser }); } 
    else { res.status(404).json({ error: 'No se encontró el usuario' }); }
  } 
  catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) { res.status(500).json({ error: 'Error de base de datos al actualizar el usuario' }); } 
    else { res.status(500).json({ error: 'No se pudo actualizar el usuario' }); }
  }
});

userRoute.patch('/email', verificarToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email  } = req.body; 
    if (!email) {  return res.status(400).json({ error: 'Se requiere un correo válido' }); }
    const userEmail = email.toLowerCase(); // Convertir correo electrónico a minúsculas
    const updatedUser = await User.findByIdAndUpdate( id, { $set: { email : userEmail } }, { new: true } ).exec();
    if (updatedUser) { res.status(200).json({ message: 'Correo actualizado correctamente', user: updatedUser }); } 
    else { res.status(404).json({ error: 'No se encontró el usuario' }); }
  } 
  catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) { res.status(500).json({ error: 'Error de base de datos al actualizar el usuario' }); } 
    else { res.status(500).json({ error: 'No se pudo actualizar el usuario' }); }
  }
});

userRoute.patch('/password', verificarToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newPassword  } = req.body; 
    if (!newPassword) {  return res.status(400).json({ error: 'Se requiere un password válido' }); }
    const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR || '3', 10); // El segundo argumento es la base numérica (10 para decimal)
    const salt = await bcrypt.genSalt(saltWorkFactor);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await User.findByIdAndUpdate( id, { $set: { password: newHashedPassword } }, { new: true } ).exec();
    if (updatedUser) { res.status(200).json({ message: 'Contraseña actualizada correctamente', user: updatedUser }); } 
    else { res.status(404).json({ error: 'No se encontró el usuario' }); }
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) { res.status(500).json({ error: 'Error de base de datos al actualizar el usuario' }); } 
    else { res.status(500).json({ error: 'No se pudo actualizar el usuario' }); }
  }
});

userRoute.patch('/level', verificarToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { level  } = req.body; 
    if (!level) {  return res.status(400).json({ error: 'Se requiere un nivel válido' }); }
    const updatedUser = await User.findByIdAndUpdate( id, { $set: { level } }, { new: true } ).exec();
    if (updatedUser) { res.status(200).json({ message: 'Nivel actualizado correctamente', user: updatedUser }); } 
    else { res.status(404).json({ error: 'No se encontró el usuario' }); }
  } 
  catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) { res.status(500).json({ error: 'Error de base de datos al actualizar el usuario' }); } 
    else { res.status(500).json({ error: 'No se pudo actualizar el usuario' }); }
  }
});

userRoute.patch('/interest', verificarToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { interest  } = req.body; 
    if (!interest) {  return res.status(400).json({ error: 'Se requiere un interés válido' }); }
    const updatedUser = await User.findByIdAndUpdate( id, { $set: { interest } }, { new: true } ).exec();
    if (updatedUser) { res.status(200).json({ message: 'Interés actualizado correctamente', user: updatedUser }); } 
    else { res.status(404).json({ error: 'No se encontró el usuario' }); }
  } 
  catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) { res.status(500).json({ error: 'Error de base de datos al actualizar el usuario' }); } 
    else { res.status(500).json({ error: 'No se pudo actualizar el usuario' }); }
  }
});

userRoute.patch('/palette', verificarToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { palette  } = req.body; 
    if (!palette) {  return res.status(400).json({ error: 'Se requiere una paleta válida' }); }
    const updatedUser = await User.findByIdAndUpdate( id, { $set: { palette } }, { new: true } ).exec();
    if (updatedUser) { res.status(200).json({ message: 'Paleta actualizada correctamente', user: updatedUser }); } 
    else { res.status(404).json({ error: 'No se encontró el usuario' }); }
  } 
  catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) { res.status(500).json({ error: 'Error de base de datos al actualizar el usuario' }); } 
    else { res.status(500).json({ error: 'No se pudo actualizar el usuario' }); }
  }
});

userRoute.get('/check-email/:email', verificarToken, async (req: Request, res: Response) => {
  const email = req.params.email;  
  const userEmail = email.toLowerCase();
  try {
    const user = await User.findOne({ userEmail });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: `Error al buscar el usuario: ${error}` });
  }
});

function verificarToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token de autenticación' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.params.id = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token de autenticación inválido' });
  }
}