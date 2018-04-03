const model = require('../models/model')

module.exports = {
  findAll: (req,res)=>{
    model.findAll()
    .then(books=>{
      res.status(200).json({
        message: `this is data`,
        data: books
      })
    })
    .catch(err=>{
      res.status(400).json({
        message: `this is error`
      })
    })
  },
  create: (req,res)=>{
    model.create(req.body)
    .then(result=>{
      res.status(201).json({
        message: `data created`,
        data: result.ops
      })
    })
    .catch(err=>{
      res.status(400).json({
        message: `this is error`
      })
    })
  },
  update: (req,res)=>{
    model.update(req.params.id, req.body)
    .then(result=>{
      res.status(200).json({
        message: `data updated`,
        data: result
      })
    })
    .catch(err=>{
      res.status(400).json({
        message: `this is error`
      })
    })
  },
  delete: (req,res)=>{
    model.delete(req.params.id)
    .then(result=>{
      res.status(200).json({
        message: `data deleted`,
        data: result
      })
    })
    .catch(err=>{
      res.status(400).json({
        message: `this is error`
      })
    })
  }
}
