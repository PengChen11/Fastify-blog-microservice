'use strict';

const projectModel = require('../model/projectModel.js');
const articleModel = require('../model/articleModel.js');


function handlerGenerator (method){
  return async (request, reply) => {
    let model;
    const modelPath = request.params.model;

    switch (modelPath) {
      case 'projects' :
        model = projectModel;
        break;
      case 'articles' :
        model = articleModel;
        break;
      default:
        // wrong path, need to go 404
        reply.callNotFound();
    }
    
    const { page = 1, limit = 10 } = request.query;

    try {
      let result;

      switch (method){
        case 'getAll' : {
          const records = await model.find()
            .limit(limit * 1)
            .skip((page-1) * limit)
            .exec();

          // get total documents in the Posts collection 
          const pageCount = await model.countDocuments();

          result = {
            records,
            totalPages: Math.ceil(pageCount / limit),
            currentPage: page,
          };
          break;
        }
        case 'getOneById':
          result = await model.findById(request.params.id);
          break;
        case 'createOne':
          result = await new model(request.body).save();
          break;
        case 'updateOne':
          result = await model.updateOne({_id: request.params.id}, request.body);
          break;
        case 'deleteOne':
          result = await model.deleteOne({_id: request.params.id});
          break;
      }
        
      return result;
    } catch (error) {
      reply.callNotFound();
    }
  };
}

const getAll = handlerGenerator('getAll');
const getOneById = handlerGenerator('getOneById');
const createOne = handlerGenerator('createOne');
const updateOne = handlerGenerator('updateOne');
const deleteOne = handlerGenerator('deleteOne');


module.exports = {getAll, getOneById, createOne, updateOne, deleteOne};
