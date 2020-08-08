const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

//knex connect
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'betsys'
    },
    pool: { min: 0, max: 7 }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

//init server
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

//rotes

//ROTE REST
server.get('/', (req, res, next) => {
    knex('usuario').then((dados) =>{
        res.send(dados);
    }, next)
});

//ROTE CREATE DATA
server.post('/create', (req, res, next) => {
    knex('usuario')
        .insert(req.body)
        .then((dados) =>{
            res.send(dados);
    }, next)
});

//ROTE RESQUEST SPECIFIC ID
server.get('/show/:id', (req, res, next) => {
    const { id } = req.params;

    knex('usuario')
    .where('user_id', id)
    .first()
    .then((dados) =>{
        if(!dados) return res.send(errs.BadRequestError('nada foi encontrado'))
        res.send(dados);
    }, next)
});

//ROTE UPDATE SPECIFIC ID
server.put('/update/:id', (req, res, next) => {
    const { id } = req.params;

    knex('usuario')
    .where('user_id', id)
    .update(req.body)
    .then((dados) =>{
        if(!dados) return res.send(errs.BadRequestError('nada foi encontrado'))
        res.send('DATA UPDATED');
    }, next)
});


//ROTE UPDATE SPECIFIC ID
server.del('/del/:id', (req, res, next) => {
    const { id } = req.params;

    knex('usuario')
    .where('user_id', id)
    .delete(req.body)
    .then((dados) =>{
        if(!dados) return res.send(errs.BadRequestError('nada foi encontrado'))
        res.send('USER DELETED');
    }, next)
});