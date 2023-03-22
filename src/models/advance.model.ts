import mongoose, { Date } from 'mongoose';
export interface IAdvance{
  progressLevel : number [];
  
}
export interface IUserAdvanceInput{
  user          : mongoose.Schema.Types.ObjectId;
  nivel         : number;
  conocimiento  : number[];
  grado_bajo    : number[];
  grado_medio   : number[];
  grado_alto    : number[];
  asistencia_a_clases   : number;
  asistencia_a_clase_semanal  : number;
  ultima_conexion_semanal_valida : Date;
  respuestas_correctas  : number;
}
export interface UserAdvanceDocument extends IUserAdvanceInput, mongoose.Document {
  createdAt: Date;  updatedAt: Date;
}
const userAdvanceSchema = new mongoose.Schema<IUserAdvanceInput>(
  {
    user          : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    nivel         : {type: Number, required: true, default:0},
    conocimiento  : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    grado_bajo    : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
    grado_medio   : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
    grado_alto    : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
    asistencia_a_clases   : {type: Number, required: true, default:0 },
    respuestas_correctas  : {type: Number, required: true, default:0 },
    asistencia_a_clase_semanal  : {type: Number, required: true, default:0 },
    ultima_conexion_semanal_valida : {type: Date, required: true, default: Date }
  },{ timestamps: true}
);

const AvanceSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  descripcion: String,
  // ...
});

const UserModel = mongoose.model<UserAdvanceDocument>('Advance', userAdvanceSchema);
export default UserModel;
