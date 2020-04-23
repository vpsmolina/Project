const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');


router.get('/', (req, res) => {
  Incident.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

router.put('/:id', (req, res, next) => {
  Incident.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);

    } else {
      console.log('Data updated');
      res.json(data);
    }
  })
});

router.get('/read/:id', (req, res) => {
  Incident.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

router.route('/:id').delete((req, res, next) => {
  Incident.findOneAndRemove({_id: req.params.id}, (error,data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

router.post('/', (req, res) => {
  let newIncident = new Incident({
    name: req.body.name,
    assignee: req.body.assignee,
    area: req.body.area,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
  });
  newIncident.save((err, doc) => {
    if (!err) {res.send(doc); }
    else { console.log('Error in Incident Save :' + JSON.stringify(err, undefined, 2));}
  });
});

module.exports = router;
