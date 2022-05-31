import { Checkbox } from 'primereact/checkbox';
import React, { Component } from 'react';

class CheckBox extends Component {
  render() {
    return (
      <>
        {this.props.data.map((item, index) => {
          return (
            <div key={`checkbox-${index}`} className="p-field-checkbox">
              <Checkbox
                inputId={item.key}
                name="location"
                value={item}
                onChange={(e) => this.props.checkboxChange(e, item.type)}
                checked={this.props.isSelected.some(
                  (items) => items.key === item.key
                )}
                // disabled={item.key === 'I'}
              />
              <label htmlFor={item.key}>{item.name}</label>
            </div>
          );
        })}
      </>
    );
  }
}

export default CheckBox;
