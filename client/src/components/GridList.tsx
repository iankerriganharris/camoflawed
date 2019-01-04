import React from 'react'
import styled from 'styled-components'

interface IGridListProps {
  items: any[]
  renderItem: (value: any, index: number, array: any[]) => {} | null | undefined
}

const Container = styled.div`
  grid-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 3fr));
  grid-auto-rows: 1fr;

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`

export const GridList: React.FunctionComponent<IGridListProps> = ({
  items,
  renderItem
}: IGridListProps) => <Container>{items.map(renderItem)}</Container>
