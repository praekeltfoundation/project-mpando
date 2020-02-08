import React, {Component} from 'react';
import './assets/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      filtered: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toogleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  };

  componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];
    if(e.target.value !== ''){
      currentList = this.props.items;
      newList = currentList.filter((item) => {
        const filter = e.target.value;
        console.log(item.includes(filter));
        return item.includes(filter);
      });

      console.log(newList);
    } else {
      newList = this.props.items;
    }

    this.setState({
      filtered: newList
    });
  }

  render() {
    let buttonStyle, inputStyleResponse, searchLabel;
    console.log('Printing',buttonStyle);
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
      <div className="search-wrapper">
        <form className="search-form" action="/" id="body-search">
          <span className="search-label" style={searchLabel}>Search</span>
          <button type="submit" className="search-submit"
            style={buttonStyle}
            onMouseEnter={this.toogleHover}
            onMouseLeave={this.toogleHover}
          ></button>
          <input
            type="search"
            className="search-input"
            placeholder="Search here"
            value="Search"
            style={inputStyleResponse}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default Search;
