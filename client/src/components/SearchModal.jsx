import React from 'react';
import axios from 'axios';

import SearchHistory from './SearchHistory.jsx';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };

    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/searchbar/history')
      .then(({ data }) => this.setState({ history: data }))
      .catch((err) => console.error(err));
  }

  onClear() {
    axios
      .delete('/api/searchbar/history')
      .then(() => console.log('Search history cleared.'))
      .catch((err) => console.error(err));

    this.props.hideSearches();
  }

  render() {
    console.log('Search Data:', this.props.searchData);

    if (this.props.searchData.length === 0) {
      return (
        <div className="searchContainer">
          <div className="searchWrapper">
            <div className="search1">
              <div className="search2">
                <ul className="search3">
                  <li
                    className="search3-First"
                    onClick={this.props.hideSearches}
                  >
                    Search History
                  </li>
                  {this.state.history.map((item, index) => (
                    <SearchHistory
                      key={index}
                      index={index}
                      item={item.search}
                      searchDropdownClick={this.props.searchDropdownClick}
                    />
                  ))}
                  <li className="search3-Last" onClick={this.onClear}>
                    Clear History
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="searchContainer">
          <div className="searchWrapper">
            <div className="search1">
              <div className="search2">Not Empty</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

module.exports = SearchModal;