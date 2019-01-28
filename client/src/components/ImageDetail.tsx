import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface IImageDetailProps {
  src: string
}

const Container = styled.div``

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`

export const ImageDetail = ({ src }: IImageDetailProps) => (
  <div>
    <StyledImg src={src} />
  </div>
)
