const { Router } = require('express');

const authMiddleware = require('../middleware/auth');
const { Errors, Files } = require('../utils/functions');

const router = Router();

router.get('/', (req, res) => res.status(200).json({ status: 200 }));

Files('./src/routes', { list: 1, lower: 1, removeDir: 1, method: 1 })
  .map(({ path, method, route }) => {
    router[method](path, authMiddleware, (req, res) => Route(req, res, route));
  });

module.exports = router;

const Route = async(req, res, route) => {
  try {
    if (!req.login) return res.status(401).json({ error: 'Você precisa estar autenticado para acessar esse endpoint...' });

    const response = await route(req, res);
    
    if (response) {
      const status = response.status || 200;
      delete response.status;

      return res.status(status).send(response);
    }

    res.status(502).json({ error: 'O endpoint não retornou nenhuma respostas valida...' });
  } catch(err) {
    return Errors(err, __filename)
      .then(() => Route(req, res, route))
      .catch((e) => res.status(e.status || 500).send(e));
  }
};

/*
  STATUS CODE:
    200 - OK - SUCESSO
    201 - CREATED - SUCESSO POST
    202 - ACCEPTED - ENTROU NA FILA
    204 - NO CONTENT - SEM CONTEÚDO PARA RESPONDER
    301 - MOVED PERMANENTLY - A URI MUDOU
    400 - BAD REQUEST - SINTAX INVALIDA
    401 - UNAUTHORIZED - NÃO AUTENTICADO
    403 - FORBIDDEN - SEM AUTORIZAÇÃO
    404 - NOT FOUND - NÃO ENCONTRADO
    405 - METHOD NOT ALLOWED - MÉTODO SOLICITADO INVALIDO
    409 - CONFLICT - REQUEST ENTROU EM CONFLITO
    423 - LOCKED - CONTEÚDO TRAVADO
    429 - MUITAS REQUISIÇÕES
    500 - INTERNAL SERVER ERROR - SITUAÇÃO INESPERADA
    502 - BAD GATEWAY - API RETORNOU UMA RESPOSTA INVALIDA
    503 - SERVICE UNAVAILABLE - SERVIDOR EM MANUTENÇÃO
    504 - GATEWAY TIMEOUT - REQUEST DEMOROU MUITO
    508 - LOOP DETECTED - LOOP INFINITO DETECTADO
*/ 