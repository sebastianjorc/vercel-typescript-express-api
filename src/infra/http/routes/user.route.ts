import { Router, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import User from './../../../models/user.model';
//import {userController} from './../controllers/user.controller'
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
});//userController.createUser);


/*
userRoute.get('/:id', userController.getUser);
userRoute.put('/:id', userController.editUser);
userRoute.delete('/:id', userController.editUser);
*/
