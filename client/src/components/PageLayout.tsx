import React, { ReactNode } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: grid;
  grid-template-areas: 'header header header' 'nav content side' 'footer footer footer';
  height: 100vh;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;

  @media (max-width: 768px) {
    grid-template-areas:
      'header'
      'nav'
      'side'
      'content'
      'footer';

    grid-template-columns: 1fr;
    grid-template-rows:
      auto /* Header */
      minmax(75px, auto) /* Nav */
      1fr /* Content */
      minmax(75px, auto) /* Sidebar */
      auto; /* Footer */

    nav,
    aside {
      margin: 0;
    }
  }

  & header {
    background: #f4991a;
    grid-area: header;
    padding: 1rem 0;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & nav {
    grid-area: nav;
    margin-left: 0.5rem;
    // background: #303030;
  }

  & main {
    grid-area: content;
    width: 100%;
    // background: #303030;
  }

  & aside {
    grid-area: side;
    margin-right: 0.5rem;
    // background: #303030;
  }

  & footer {
    grid-area: footer;
    // background: #000000;
  }
`

export const PageLayout: React.FunctionComponent<{ children: ReactNode }> = ({
  children
}) => <StyledContainer>{children}</StyledContainer>
