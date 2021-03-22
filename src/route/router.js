'use strict';
const {getAll, getOneById, updateOne,  deleteOne, createOne} = require('./routerHandler.js');

const getAllOptions = {
  schema: {
    query: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    },
  },
};


async function routes (fastify, options) {


  fastify.get('/:model', getAllOptions, getAll);
  fastify.get('/:model/:id', getOneById);
  fastify.post('/:model', createOne);
  fastify.patch('/:model/:id', updateOne);
  fastify.delete('/:model/:id', deleteOne);
}

module.exports = routes;