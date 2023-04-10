import mongoose, { Date } from 'mongoose';
export interface IAdvance{
  progressLevel : number [];
  
}
export interface IUserAdvanceInput{
  _id           : mongoose.Schema.Types.ObjectId;
  nivel         : number;
  conocimiento  : number[];
  grado_bajo    : number[];
  grado_medio   : number[];
  grado_alto    : number[];
  ultima_conexion : Date;
  asistencia_a_clases   : number;
  asistencia_a_clase_semanal  : number;
  ultima_conexion_semanal_valida : Date;
  respuestas_correctas  : number;
  cantidad_actividades_realizadas: number;
  numero_transiciones_conocimiento_alto : number[];
  numero_transiciones_conocimiento_medio: number[];
  numero_transiciones_conocimiento_bajo: number[];
}
export interface UserAdvanceDocument extends IUserAdvanceInput {
  createdAt: Date;  updatedAt: Date; 
}
const userAdvanceSchema = new mongoose.Schema<IUserAdvanceInput>(
  {
    _id           : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    conocimiento  : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},//46
    grado_bajo    : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0] }, // 09
    grado_medio   : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0] },   // 08
    grado_alto    : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0] }, // 09
    ultima_conexion: {type: Date, required: true, default: Date },
    asistencia_a_clases   : {type: Number, required: true, default:0 },
    respuestas_correctas  : {type: Number, required: true, default:0 },
    asistencia_a_clase_semanal    : {type: Number, required: true, default:0 },
    cantidad_actividades_realizadas: {type: Number, required: true, default:0 },
    ultima_conexion_semanal_valida: {type: Date, required: true, default: Date },
    numero_transiciones_conocimiento_alto : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0]}, //09
    numero_transiciones_conocimiento_medio : {type: [Number], required: true,default:[0,0,0,0,0,0,0,0]}, //08
    numero_transiciones_conocimiento_bajo : {type: [Number], required: true, default:[0,0,0,0,0,0,0,0,0]}, //09
  },{ timestamps: true}
);

const UserModel = mongoose.model<UserAdvanceDocument>('Advance', userAdvanceSchema);
export default UserModel;
