import React, { Component } from 'react';
import { MultiSelect } from 'primereact/multiselect';

class MultiSelectCheckbox extends Component {
  render() {
    return (
      <>
        <MultiSelect
          className="w-100"
          value={this.props.isSelected}
          filter
          options={this.props.data}
          onChange={(e) => this.props.multiSelectChange(e, this.props.name)}
          optionLabel={this.props.optionLable}
          placeholder={this.props.placeholder}
          optionValue={this.props.optionValue}
          onShow={this.props.onShow}
          onFilter={this.props.onFilter}
          showClear
          resetFilterOnHide="true"
        />
      </>
    );
  }
}

export default MultiSelectCheckbox;
