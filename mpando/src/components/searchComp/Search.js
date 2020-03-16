import React, {Component} from 'react';
import './assets/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      filtered: [],
      someValue: ''
    }
  }


  componentDidMount() {
    this.setState({
      filtered: this.props.articleLists
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('Search: componentWillReceiveProps');
    this.setState({
      filtered: nextProps.articleLists
    });
  }

//An Expensive Job to Memory/CPU
  handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.value;
    let currentList = [];
    let searchPoolArray = [];
    let resultsList = [];

    if(query !== '') {
      currentList = this.props.articleLists;
      for(let i = 0; i < currentList.length; i++) {
        let title = currentList[i].title.toLowerCase();
        let desc = currentList[i].description.toLowerCase();
        let links = currentList[i].link;
        searchPoolArray.push(title.split(' '),desc.split(' '),links);

        resultsList = searchPoolArray.filter((article) => {
          return article.includes(query);
        });
      }

    } else {
      resultsList = this.props.articleLists;
    }
    this.setState({
      filtered: resultsList
    });
  }

  toogleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  };

  render() {
    const {filtered} = this.state;

    console.log(filtered);
    let buttonStyle, inputStyleResponse, searchLabel;
    if(this.state.hover) {
      searchLabel = {visibility: 'visible', transition: 'visibility 0.8s ease',transitionDelay: '0.1s'}
      inputStyleResponse = { padding:'15px'};
      buttonStyle = { width: '150px', cursor: 'pointer', borderRadius: '20px',backgroundPosition: '8px center'};
    } else {
      searchLabel = {visibility: 'hidden'}
      inputStyleResponse = {padding: '15px'}
      buttonStyle = {width: '35px',borderRadius: '18px',backgroundPosition: '8px'}
    }
    return (
      <div className="Search-wrapper">
        <form className="Search-form" id="body-search">
          <button type="submit" className="Search-submit"
            style={buttonStyle}
            onMouseEnter={this.toogleHover}
            onMouseLeave={this.toogleHover}

          >
            <span className="Search-label" style={searchLabel}>Search</span>
          </button>
          <input
            type="search"
            className="Search-input"
            placeholder="Search"
            style={inputStyleResponse}
            onChange={this.handleSubmit}
          />
        </form>
        <div className="Search-results">
          {filtered.map((item,i) =>
            <p key={i}>{item[i]}</p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
