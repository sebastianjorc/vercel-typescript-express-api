import { Router, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import User from './../../../models/user.model';
export const userRoute = Router();

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
userRoute.post('/', async (req : Request, res : Response) => {
  const user = await new User(req.body);
  user
    .save()
    .then((data: any) => res.json(data))
    .catch((error : MongoError)=>res.json({message:`${error}    ${req.body}`}));
});


userRoute.patch('/:id/avatar', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { avatarPath: req.body.avatarPath } }, { new: true }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'No se pudo actualizar el usuario' });
    } else {
      res.status(200).json(doc);
    }
  });
});

userRoute.patch('/:id/username', (req, res) => {
  console.log('REQUEST: \n\n\n',req.body);
  User.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username } }, { new: true }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'No se pudo actualizar el usuario' });
    } else {
      res.status(200).json(doc);
    }
  });
});

userRoute.patch('/:id/email', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { email: req.body.email } }, { new: true }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'No se pudo actualizar el usuario' });
    } else {
      res.status(200).json(doc);
    }
  });
});

userRoute.patch('/:id/password', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { password: req.body.password } }, { new: true }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'No se pudo actualizar el usuario' });
    } else {
      res.status(200).json(doc);
    }
  });
});

userRoute.get('/check-email/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: `Error al buscar el usuario: ${error}` });
  }
});
