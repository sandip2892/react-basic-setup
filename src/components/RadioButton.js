import React, { Component } from 'react';
import { RadioButton } from 'primereact/radiobutton';

class RedioButton extends Component {
  render() {
    return (
      <>
        {this.props.data.map((item, index) => {
          return (
            <div key={`radio-${index}`} className="p-field-radiobutton">
              <RadioButton
                inputId={item.value + index}
                name={item.name}
                value={item.value}
                onChange={(e) => this.props.radioChange(e, item.name)}
                checked={this.props.isSelected === item.value}
              />
              <label htmlFor={item.value + index}>{item.value}</label>
            </div>
          );
        })}
      </>
    );
  }
}

export default RedioButton;
