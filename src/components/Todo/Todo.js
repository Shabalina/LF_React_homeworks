import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  state = {
    inputValue: ''
  };
  

  getId() {  
    const { savedData } = this.props;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  handleChange = event => {
    this.setState({inputValue: event.target.value});    
  };

  saveNewRecord(){
    const { saveData, savedData } = this.props;
    const { inputValue } = this.state;
    const recObj = {
      id: this.getId(), 
      isComplete: false, 
      text: inputValue
    }
    let newData = savedData
    newData.push(recObj)
    saveData(newData);
  }

  createNewRecordByEnter = event => {
    if (event.key === 'Enter' && this.state.inputValue !== ''){     
      this.saveNewRecord();                
      this.setState({
        inputValue: ''
          });          
    }
  };

  toggleRecordComplete = event => {
    const { saveData, savedData } = this.props;
    let newData = savedData.map((recObj) => {
      if(recObj.id === parseInt(event.target.id)){   
        recObj.isComplete = !recObj.isComplete
        return recObj 
      } 
      return recObj
    })
    saveData(newData)
  };

  createNewRecord = () => {  
    
    if (this.state.inputValue !== ''){     
      this.saveNewRecord();               
      this.setState({
        inputValue: ''
          });          
    }
  };

  render() {      
    const { savedData } = this.props;    
    return (
    <Card title={"Список дел"}>
      <div className="todo t-todo-list">
        {this.renderEmptyRecord()}
        {savedData.length ? this.renderRecords() : null}
      </div>
    </Card>      
    )
  }

  renderRecords(){
    const { savedData } = this.props;
    return(
      savedData.slice(0).reverse().map((recObj) => {
        return this.renderRecord(recObj)        
      })   
    )
  }

  renderEmptyRecord() {
    return(      
        <div className="todo-item todo-item-new">
          <input 
            className="todo-input t-input" 
            placeholder="Введите задачу" 
            value={this.state.inputValue}
            onChange={this.handleChange}
            onKeyPress={this.createNewRecordByEnter}
          />
          <span 
            className="plus t-plus" 
            onClick={this.createNewRecord}
          >
            +
          </span>
        </div>        
    )
  }

  renderRecord = record => { 
    return(
      <div key={record.id} className="todo-item t-todo">
      <p className="todo-item__text">{record.text}</p>
      <span 
        className="todo-item__flag t-todo-complete-flag"
        id={record.id}
        onClick={this.toggleRecordComplete}
        >
        [
        {record.isComplete ? (" ") : ("x")}
        ]
      </span>
    </div>
    )

  };
}

//export default Todo;
export default withLocalstorage('todo-app', [])(Todo);
