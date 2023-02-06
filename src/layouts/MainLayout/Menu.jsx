import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import styled from "styled-components";

const Root = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;  
  border: 1px solid grey;

  > li {
    display: inline;
    float: left;
  }

  li a {
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover {
    color: #4682B4;
    text-decoration: underline
  } 
  
  .active {
    color: #4682B4;    
  }
`
function Menu({ items }) {
  return (
    <Root>      
      {items.map((item, i) => (
        <li key={i}>
          <NavLink to={item.linkTo}>{item.title}</NavLink>
        </li>
      ))}
    </Root>
  )
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired
  }).isRequired)
}

export default Menu
