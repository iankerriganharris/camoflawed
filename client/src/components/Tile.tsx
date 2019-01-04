import React from 'react'
import styled from 'styled-components'

interface ITileProps {
  children?: React.ReactNode
}

const StyledTile = styled.div`
  background: rgba(0, 0, 0, 0.1);
`

export const Tile: React.FunctionComponent<ITileProps> = ({
  children
}: ITileProps) => <StyledTile>{children}</StyledTile>
