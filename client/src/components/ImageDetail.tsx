import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface IImageDetailProps {
  src: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const StyledImg = styled.img`
  max-width: 90%;
  height: auto;
`

export const ImageDetail = ({ src }: IImageDetailProps) => (
  <Container>
    <StyledImg src={src} />
  </Container>
)
