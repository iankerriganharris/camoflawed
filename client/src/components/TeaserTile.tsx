import React from 'react'
// @ts-ignore
import FadeIn from 'react-lazyload-fadein'
import styled from 'styled-components'

interface ITileProps {
  children?: React.ReactNode
  backgroundImage?: string
  fade?: boolean
}

const StyledTile = styled.article`
  & figure {
    position: relative;
    margin: 0;
    padding: 30% 0;
  }

  & figcaption {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    // background: rgba(0, 0, 0, 0.25);
    // background: #f7f7f7;
  }

  & figcaption h1 {
    color: white;
    padding: 4px 8px;
  }

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const notFoundImg =
  'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'

export const TeaserTile: React.FunctionComponent<ITileProps> = ({
  children,
  backgroundImage,
  fade = true
}: ITileProps) => (
  <StyledTile>
    <figure>
      {!fade ? (
        <div className="d-inline-block">
          <img src={backgroundImage ? backgroundImage : notFoundImg} />
        </div>
      ) : (
        <FadeIn height={182} once offset={500} duration={250}>
          {(onload: any) => (
            <img
              onLoad={onload}
              src={backgroundImage ? backgroundImage : notFoundImg}
            />
          )}
        </FadeIn>
      )}
      <figcaption>
        <h1>{children}</h1>
      </figcaption>
    </figure>
  </StyledTile>
)
