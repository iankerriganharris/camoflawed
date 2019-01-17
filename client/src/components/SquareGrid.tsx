import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface ISquareGridProps {
  children: ReactNode
}

const StyledSection = styled.section`
  grid-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 3fr));
`

export const SquareGrid: React.FunctionComponent<ISquareGridProps> = ({
  children
}: ISquareGridProps) => <StyledSection>{children}</StyledSection>
