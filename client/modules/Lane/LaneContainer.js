import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import { updateLaneRequest, deleteLaneRequest, moveBetweenLanes, removeFromLane, pushToLane, changeLanesRequest, moveBetweenLanesRequest, createLaneRequest, fetchLanes, reorderLaneNotesRequest } from "./LaneActions";
import { createNote, createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => {
      return { ...state.notes[noteId] }
    })
  };
};

const mapDispatchToProps = {
  ...laneActions,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes: moveBetweenLanesRequest,
  reorderLaneNotes: reorderLaneNotesRequest,
  removeFromLane,
  changeLanesRequest,
  pushToLane,
};

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    if (sourceLaneId !== targetProps.lane.id) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId
      );
    } else {
      // Reorder
      targetProps.reorderLaneNotes(
        targetProps.lane.id,
        targetProps.lane.notes
      );
    }
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
