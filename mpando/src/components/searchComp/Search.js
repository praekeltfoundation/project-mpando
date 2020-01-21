import React from 'react';
import './assets/Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleChangeState = event => {
    setSearchQuery(event.target.value);
  }
  return (
    <div className="search-wrapper">
      <form class="form-search form-inline" action="/" id="body-search">
        <button type="submit" class="search-submit"></button>
        <input
          type="search"
          className="search-input"
          placeholder="Search here"
          value={searchQuery}
          onChange={handleChangeState}
        />
      </form>
    </div>
  )
}

export default Search;
