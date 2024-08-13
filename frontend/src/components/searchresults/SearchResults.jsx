import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/navbar.jsx';
import './searchresults.css';

const SearchResults = () => {
  const [results, setResults] = useState({ users: [], posts: [], businesses: [] });
  const [searchType, setSearchType] = useState('users');
  const location = useLocation();
  const navigate = useNavigate();
  
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/search`, {
          params: {
            query: query,
            type: searchType
          }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, searchType]);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    navigate(`/search?query=${query}&type=${type}`);
  };

  return (
    <div>
      <Navbar />
      <div className="search-bar">
        <h2>Search Results for "{query}"</h2>
        <div className="search-type-selector">
          <button 
            onClick={() => handleSearchTypeChange('users')}
            className={searchType === 'users' ? 'active' : ''}
          >
            Users
          </button>
          <button 
            onClick={() => handleSearchTypeChange('posts')}
            className={searchType === 'posts' ? 'active' : ''}
          >
            Posts
          </button>
          <button 
            onClick={() => handleSearchTypeChange('businesses')}
            className={searchType === 'businesses' ? 'active' : ''}
          >
            Businesses
          </button>
        </div>
        {searchType === 'users' && results.users.length > 0 && (
          <ul>
            {results.users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName} - {user.email}
              </li>
            ))}
          </ul>
        )}
        {searchType === 'posts' && results.posts.length > 0 && (
          <ul>
            {results.posts.map((post) => (
              <li key={post.id}>
                {post.comment}
              </li>
            ))}
          </ul>
        )}
        {searchType === 'businesses' && results.businesses.length > 0 && (
          <ul>
            {results.businesses.map((company) => (
              <li key={company.id}>
                {company.name} - {company.description}
              </li>
            ))}
          </ul>
        )}
        {results[searchType].length === 0 && <p>No results found</p>}
      </div>
    </div>
  );
};

export default SearchResults;
