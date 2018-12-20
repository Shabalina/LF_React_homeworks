import React from 'react';
import './Message.css';

export default class Message extends React.Component {
    render() {
      const {text, i} = this.props;  
      //const {i} = this.props;  
      return (
        <span className="message" key={i}>{text}</span>
        //<span className="message" key={i}>{}</span>
      );
    }
  }