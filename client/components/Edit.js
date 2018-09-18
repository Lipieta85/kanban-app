import React, { Component } from 'react';
import styles from './Edit.css';
import PropTypes from 'prop-types';

export default class Edit extends Component {
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {
    const value = e.target.value;

    if (this.props.onUpdate) {
      this.props.onUpdate(value.trim());
    }
  };

  renderDelete = () => {
    return <button className={styles.delete} onClick={this.props.onDelete}>×</button>;
  };

  renderEdit = () => {
    return (
      <input
        type="text"
        autoFocus
        defaultValue={this.props.value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
      />
    );
  };

  render = () => {
    const { value, onValueClick } = this.props;
    return (
      <div>
        {!this.props.editing && (<span className={styles.value} onClick={onValueClick}>{value}</span>)}
        {this.props.editing && this.renderEdit()}
        {this.props.onDelete && this.renderDelete()}
      </div>
    );
  }
}

Edit.propTypes = {
  value: PropTypes.string,
  onUpdate: PropTypes.func,
  onValueClick: PropTypes.func,
  onDelete: PropTypes.func,
  editing: PropTypes.bool,
};
