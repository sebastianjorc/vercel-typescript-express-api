import { Router } from 'express';
import DefaultRouter from '../../../modules/status/infra/http/routes/default.route';
//import ProductRouter from '../../../modules/product/infra/http/routes/product.routes';
import {userRoute} from './user.route';
import {loginRoute} from './login.route';

const Routes = Router();

Routes.use('/', DefaultRouter);
//Routes.use('/product', ProductRouter);
Routes.use('/api/users', userRoute);
Routes.use('/api/login', loginRoute);

export default Routes;
