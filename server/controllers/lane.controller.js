import uuid from 'uuid';
import Note from '../models/note';
import Lane from '../models/lane';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({
      lanes
    });
  });
}

export function deleteLane(req, res) {
  Lane.findOneAndRemove({
    id: req.params.laneId
  }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    if (lane.notes) {
      Note.remove({
        _id: { $in: lane.notes.map(n => n._id) }
      }).exec((err) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).end();
      })
    }
  });
}

export function editLane(req, res) {
  Lane.findOne({
      id: req.params.laneId
    })
    .then((lane) => {
      lane.name = req.body.name
      return lane.save()
    })
    .then(() => {
      res.json(200).end()
    })
}

export function updateLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }
  Lane.findOneAndUpdate({
    id: req.params.laneId
  }, {
    name: req.body.name
  }).exec((err, oldName) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(oldName);
  });
}

export function moveNoteBetweenLane(req, res) {
  Lane.findOne({
    id: req.params.laneId
  }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    const note = lane.notes.find(note => note.id === req.body.noteId);
    const sourceIndex = lane.notes.indexOf(note);
    lane.notes.splice(sourceIndex, 1);
    lane.save(err => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(lane);
    });
    Lane.findOne({
      id: req.body.targetLaneId
    }).then(targetLane => {
      targetLane.notes.push(note);
      targetLane.save(err => {
        if (err) {
          res.status(500).send(err);
        }
      });
    });
  });
}

export function notesReorder(req, res) {
  if (!req.body.notes) {
    res.status(403).end();
  }
  Lane.findOne({
    id: req.params.laneId
  }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    const notes = req.body.notes;
    lane.notes = notes.map(note => lane.notes.find(n => n.id === note));
    lane.save(err => {
      res.json(lane);
    });
  });
}
