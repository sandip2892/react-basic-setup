import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';

class SelectDropdown extends Component {
  render() {
    return (
      <>
        <Dropdown
          className="w-100"
          value={this.props.isSelected}
          options={this.props.data}
          onChange={(e) => this.props.dropdownChange(e, this.props.name)}
          optionLabel="label"
          placeholder={this.props.placeholder ? this.props.placeholder : ''}
        />
      </>
    );
  }
}

export default SelectDropdown;
