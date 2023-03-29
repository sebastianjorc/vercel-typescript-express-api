import { Router, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import UserAdvance from './../../../models/advance.model';

export const advanceRoute = Router();

advanceRoute.get('/', async (req : Request, res : Response) => {
    try {
      const user = await UserAdvance.find();
      return res.json(user);
    }
    catch (err : any) {
      return res.status(500).json({ message: err.message });
    }
});
advanceRoute.post('/', async (req : Request, res : Response) => {
    const user = await new UserAdvance(req.body);
    user
      .save()
      .then((data: any) => res.json(data))
      .catch((error : MongoError)=>res.json({message:`${error}    ${req.body}`}));
});
advanceRoute.get('/:id', async (req : Request, res : Response) => {
    try{
      const {id} = req.body;
      const user = await UserAdvance.findOne({ id });
      if (!user) {
        return res.status(400).send({ msg: 'Usuario no existe en la base de datos' });
      }
      res.send({ user });
    }
    catch(error){
      console.error(`Error en advance.route.ts:  \n   ${error}`);
      console.log(`Error en advance.route.ts:  \n   ${error}`);
    }
});
advanceRoute.patch('/:id/nivel', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { nivel: req.body.nivel } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});  
advanceRoute.patch('/:id/conocimiento', (req : Request, res : Response) => {
    console.log('REQUEST: \n\n\n',req.body);
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { conocimiento: req.body.conocimiento } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});  
advanceRoute.patch('/:id/grado_bajo', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { grado_bajo: req.body.grado_bajo } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});  
advanceRoute.patch('/:id/grado_medio', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { grado_medio: req.body.grado_medio } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});
advanceRoute.patch('/:id/grado_alto', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { grado_alto: req.body.grado_alto } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
});
});
advanceRoute.patch('/:id/asistencia_a_clases', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { asistencia_a_clases: req.body.asistencia_a_clases } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});  
advanceRoute.patch('/:id/respuestas_correctas', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { respuestas_correctas: req.body.respuestas_correctas } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});
advanceRoute.patch('/:id/asistencia_a_clase_semanal', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { asistencia_a_clase_semanal: req.body.asistencia_a_clase_semanal } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});
advanceRoute.patch('/:id/ultima_conexion_semanal_valida', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { ultima_conexion_semanal_valida: req.body.ultima_conexion_semanal_valida } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});
advanceRoute.patch('/:id/cantidad_actividades_realizadas', (req : Request, res : Response) => {
    UserAdvance.findByIdAndUpdate(req.params.id, { $set: { cantidad_actividades_realizadas: req.body.cantidad_actividades_realizadas } }, { new: true }, (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo actualizar el usuario' });
      } else {
        res.status(200).json(doc);
      }
    });
});