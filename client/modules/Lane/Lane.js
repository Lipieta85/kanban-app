import React from 'react';
import NotesContainer from '../Note/NoteContainer';
import PropTypes from 'prop-types';

import Edit from '../../components/Edit';

import styles from './Lane.css';

class Lane extends React.Component {
  render() {
    const { connectDropTarget, lane, laneNotes, updateLane, addNote, deleteLane, editLane } = this.props;
    const laneId = lane.id;

    return connectDropTarget(

      <div className={styles.Lane}>
        <div className={styles.LaneDelete}>
          <button onClick={() => deleteLane(lane)}>Remove Lane</button>
        </div>
        <div className={styles.LaneHeader}>
          <h4><Edit
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onValueClick={() => editLane(lane.id)}
            onUpdate={name => updateLane({ ...lane, name, editing: false })}
          /></h4>
        </div>
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNote({ task: 'New Note ' }, laneId)}>Add Note</button>
        </div>
        <NotesContainer
          notes={laneNotes}
          laneId={laneId}
        />
      </div>
    );
  };
}

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  editing: PropTypes.bool,
  deleteLane: PropTypes.func,
};

export default Lane;
