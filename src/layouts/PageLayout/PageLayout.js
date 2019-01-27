import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='page'>
    <div className="header">

    <IndexLink
      className='link'
      to='/' activeClassName='page-layout__nav-item--active'
    >
      ORG
    </IndexLink>
    <Link
      className='link'
      to='/counter' activeClassName='page-layout__nav-item--active'>BOOM</Link>
    </div>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
