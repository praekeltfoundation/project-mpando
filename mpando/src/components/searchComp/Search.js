import React from 'react';
import './assets/Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChangeState = event => {
    setSearchQuery(event.target.value);
  }
  return (
    <div className="search-wrapper">
      <input
        type="search"
        className="search-input"
        placeholder="Search here"
        value={searchQuery}
        onChange={handleChangeState}
      />
    </div>
  )
}

export default Search;
