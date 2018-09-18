import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Read Lanes
router.route('/lanes').get(LaneController.getLanes);

// Add a new Lane
router.route('/lanes').post(LaneController.addLane);

// Delete Lane
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

// Update a lane name  by laneId
router.route('/lanes/:laneId').put(LaneController.updateLane);

// Note reorder
router.route('/lanes/:laneId/reorder').put(LaneController.notesReorder);

// Move a Note between Lane
router.route('/lanes/:laneId/moveNote').put(LaneController.moveNoteBetweenLane);

export default router;
