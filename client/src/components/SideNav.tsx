import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledList = styled.ul`
  list-style: none;
`

export const SideNav: React.FunctionComponent<{}> = () => (
  <StyledList>
    <li>
      <Link to="/industries">Industries</Link>
    </li>
  </StyledList>
)
