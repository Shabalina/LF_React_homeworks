import React from 'react';
import Message from '../Message';
import './Chat.css';

export default class Chat extends React.Component {
    state = {
        messageInput: '',
        messages: []
      };

    changeInputMessage = event => {
        this.setState({messageInput: event.target.value});
    };

    sendMessageOnEnter = event => {
        if (event.key === 'Enter' && this.state.messageInput !== ''){     
            this.setState(prevState => ({
                messages: [...prevState.messages, {text: this.state.messageInput}]
              }))                 
            this.setState({
                messageInput: ''
                });    
                
        }
    }
      
    render() {  
      return (
        <div className="chat">
            <div className="message-list">
                <div className="messages">                    
                    {
                    this.state.messages.map((message, i) => {
                        return <Message key={i} text={message.text}/>;
                    })
                        
                    }
                </div>
            </div>
            <input className="input-message" value={this.state.messageInput} onChange={this.changeInputMessage} onKeyPress={this.sendMessageOnEnter}/>
        </div>
      );
    }
  }