import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './assets/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      filtered: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      filtered: this.props.articleLists
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.articleLists
    });
  }
  handleSubmit(e) {
    let currentList = [];
    let newList = [];
    if(e.target.value !== ''){
      currentList = this.props.articleLists;
      newList = currentList.filter((article) => {
        const filter = e.target.value;
        return article.includes(filter);
      });
    } else {
      newList = this.props.articleLists;
    }
    this.setState({
      filtered: newList
    });
  }
  toogleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  };
  render() {
    let buttonStyle, inputStyleResponse, searchLabel;
    if(this.state.hover) {
      searchLabel = {visibility: 'visible', transition: 'visibility 0.5s ease'}
      inputStyleResponse = { padding:'15px 15px 15px 160px'};
      buttonStyle = { width: '150px', cursor: 'pointer', borderRadius: '20px',backgroundPosition: '8px center'};
    } else {
      searchLabel = {visibility: 'hidden'}
      inputStyleResponse = {padding: '15px 15px 15px 60px'}
      buttonStyle = {width: '35px',borderRadius: '18px',backgroundPosition: '8px'}
    }
    return (
      <div className="Search-wrapper">
        <form className="Search-form" action="/" id="body-search">
          <span className="Search-label" style={searchLabel}>Search</span>
          <button type="submit" className="Search-submit"
            style={buttonStyle}
            onMouseEnter={this.toogleHover}
            onMouseLeave={this.toogleHover}
            onSubmit={this.handleSubmit}
          ></button>
          <input
            type="search"
            className="Search-input"
            placeholder="Search"
            style={inputStyleResponse}
          />
        </form>

        <Link
          to={{
            pathname: "/results",
            state: ['list one', 'list two', 'list three']
          }}
        />
      </div>
    );
  }
}

export default Search;
