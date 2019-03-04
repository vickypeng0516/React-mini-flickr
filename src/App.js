import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


class App extends Component {

  constructor(props, context){
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    // 初始化创建react component的值
    this.state = {
      showAll: true,
      keyword: '',
      photos: []
    };
  }
  // mount ： 加载
  componentDidMount(){
    // fetch data
    fetch("/api/v1/photos")
      // after getting data, convert response to json format (promise)
      .then(response => response.json())
      // 将json format的data 赋值到初始化创建的component的photos值
      .then(data => this.setState({photos: data}));
  }

  handleChange(e){
    this.setState({showAll : e === 1 ? true : false});
  }

  setKeyWord(keyword){
    this.setState({keyword : keyword});
  }


  render() {
    return (
      <div className="container">
        <SearchBar sendKeywordToApp={
           (keyword) => {
             this.setKeyWord(keyword);
           }
        }/>
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.handleChange}>
            <ToggleButton value={1}>All</ToggleButton>
            <ToggleButton value={2}>Pinned</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <Gallery elements={this.state.photos} showAll={this.state.showAll} keyword={this.state.keyword} />
      </div>
    );
  }
}

export default App;
