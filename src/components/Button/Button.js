import React, { PureComponent } from 'react';
import './Button.css';

class Button extends PureComponent {
  handleClick = () =>{
    this.props.onClick()
  } 
  render() {
    const { className, children } = this.props;
    return (
      <button onClick={this.handleClick} className={`${className} button`}>
        {children}
      </button>
    );
  }
}

export default Button;
