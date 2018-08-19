 import * as express from 'express';
 import * as mongoose from 'mongoose';
 import { Application } from 'express';
 // import * as logger from 'morgan';
 // import * as swaggerUi from 'swagger-ui-express';
 // import * as cors from 'cors';

 import { setGlobalMiddleware} from './api/middlewares/global-middleware';
// import  swaggerDocument from './config/swagger.json';

// import { router } from './config/routes';
import { restRouter } from './api';
// const bodyParser = require('body-parser');
// const swaggerDocument = require('./config/swagger.json');

 mongoose.connect('mongodb://localhost/invoice-builder');

 const app: Application = express();
 const PORT = 3000;
 setGlobalMiddleware(app);
/*
 app.use(bodyParser.json());
 app.use(express.urlencoded());
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true}));
 app.use(logger('dev'));
 app.use(cors());
 */
 app.use('/api', restRouter);
 app.use((error, req, res, next) => {
   res.status(error.status || 500 );
   return res.json({ error: { message: error.message, }});
 });


 const httpServer = app.listen(PORT, () => {
   console.log('HTTP SERVER Running port 3000 ......');
 });
