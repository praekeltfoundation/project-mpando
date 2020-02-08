import React, {Component} from 'react';
import './assets/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  toogleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  }

  render() {
    let buttonStyle, inputStyleResponse, submitLabel;
    console.log('Printing',buttonStyle);
    if(this.state.hover) {
      inputStyleResponse = { padding:'15px 15px 15px 160px'};
      buttonStyle = { width: '150px', cursor: 'pointer', borderRadius: '20px',backgroundPosition: '8px center'};
    } else {
      inputStyleResponse = {padding: '15px 15px 15px 60px'}
      buttonStyle = {width: '35px',borderRadius: '18px',backgroundPosition: '8px'}
    }
    return (
      <div className="search-wrapper">
        <form className="form-search form-inline" action="/" id="body-search">
          <button type="submit" className="search-submit"
            style={buttonStyle}
            onMouseEnter={this.toogleHover}
            onMouseLeave={this.toogleHover}
          >
            <span>{submitLabel ? submitLabel : null}</span>
          </button>
          <input
            type="search"
            className="search-input"
            placeholder="Search here"
            value="Search"
            style={inputStyleResponse}
          />
        </form>
      </div>
    );
  }
}

export default Search;
