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
    console.log('Search: componentDidMount');
    this.setState({
      filtered: this.props.articleLists
    });
  }
  //How is this called?
  // componentWillReceiveProps(nextProps) {
  //   console.log('Search: componentWillReceiveProps');
  //   this.setState({
  //     filtered: nextProps.articleLists
  //   });
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    alert('FIRED');
    let currentList = [];
    let newList = [];
    const filter = e.target.value;
    console.log('CLICKED TARGET',filter);

    if(filter !== '') {
      currentList = this.props.articleLists; //Should this be a prop again?
      newList = currentList.filter((article) => {
        return article.includes(filter);
      });
    } else {
      newList = this.props.articleLists;
    }

    console.log('NEW LIST',newList,'vs', currentList);

    this.setState({
      filtered: newList
    });

    console.log('FILTERED',this.state.filtered,'===', newList);
  }

  toogleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  };

  render() {
    const {filtered} = this.state;
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
        <form className="Search-form" id="body-search">
          <span className="Search-label" style={searchLabel}>Search</span>
          <button type="submit" className="Search-submit"
            style={buttonStyle}
            //onMouseEnter={this.toogleHover}
            //onMouseLeave={this.toogleHover}
            onSubmit={e => this.handleSubmit()}
          ></button>
          <input
            type="search"
            className="Search-input"
            placeholder="Search"
            style={inputStyleResponse}
          />
        </form>
      </div>
    );
  }
}

export default Search;
