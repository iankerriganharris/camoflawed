import React from 'react'
import styled from 'styled-components'

interface ITileProps {
  children?: React.ReactNode
  backgroundImage?: string
}

const StyledTile = styled.div`
  ${(props: ITileProps) =>
    props.backgroundImage
      ? `
        position: relative;
        z-index: 1;
        height: 100%;
        
        &:before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: url(${props.backgroundImage}) center center;
          opacity: .4;
          background-size: cover;
        }
        `
      : 'background: rgba(0, 0, 0, 0.1); height: 100%;'}
`

export const Tile: React.FunctionComponent<ITileProps> = ({
  children,
  backgroundImage
}: ITileProps) => (
  <StyledTile backgroundImage={backgroundImage}>{children}</StyledTile>
)
