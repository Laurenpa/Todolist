import React, {Component,Fragment} from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleBtnClick=this.handleBtnClick.bind(this);
    this.handleItemDelete=this.handleItemDelete.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))
    // this.setState({
    //   inputValue: e.target.value
    // })
  }
  
  handleBtnClick() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
    // this.setState({k
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
  }

  handleItemDelete(index) {
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {list}
    })
    //immutable
    //state 不允许我们做任何的改变
    // const list = [...this.state.list];
    // list.splice(index,1);
    // this.setState({
    //   list: list
    // })
  }

  getTodoItem() {
    return this.state.list.map((item, index)=> {
      return(
   <div key = {index}>
     <TodoItem content={item} 
       index={index} 
       deleteItem={this.handleItemDelete}/>
       {/*(<li key={index} onClick={this.handleItemDelete(index)}
       dangerouslySetInnerHTML={{__html: item}}></li>)*/}
   </div>
    )
    })
  }

  render() {
    return ( 
      <Fragment >
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input id="insertArea" value={this.state.inputValue} onChange={this.handleInputChange} />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }

  componentDidMount() {
    axios.get('/api/todolist')
      .then(()=>{alert('succ')})
      .catch((res)=>{alert('error')})
  }
}

export default TodoList