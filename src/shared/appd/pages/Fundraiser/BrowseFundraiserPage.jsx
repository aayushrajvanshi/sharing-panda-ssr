import React from 'react';
import { Link } from 'react-router-dom';

const BrowseFundraiserPage = ({ match }) => (
  <div>
    Browse Fundraiser
    <ul>
      <li><Link to={`${match.path}/1`}>Fundraiser 1</Link></li>
      <li><Link to={`${match.path}/2`}>Fundraiser 2</Link></li>
      <li><Link to={`${match.path}/3`}>Fundraiser 3</Link></li>
      <li><Link to={`${match.path}/4`}>Fundraiser 4</Link></li>
    </ul>
  </div>
)

export default BrowseFundraiserPage