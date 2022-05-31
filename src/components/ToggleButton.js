import React, { Component } from 'react';
import { SelectButton } from 'primereact/selectbutton';

class ToggleButton extends Component {
  render() {
    return (
      <>
        <SelectButton
          className="select-button"
          value={this.props.isSelected}
          options={this.props.data}
          onChange={(e) => this.props.toggleChange(e, this.props.data[0].type)}
          optionLabel="name"
          multiple={this.props.isMultiple ? true : false}
        />
      </>
    );
  }
}

export default ToggleButton;
