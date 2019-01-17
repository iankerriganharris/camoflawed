import React from 'react'
import styled, { StyledComponent } from 'styled-components'

interface IVariedGridProps {
  // renderItem: (value: any, index: number, array: any[]) => {} | null | undefined
  rowHeight: number
  colWidth: string
  children: any
}

const Parent = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props: IVariedGridProps) => props.colWidth}, 1fr)
  );
  grid-auto-rows: calc(${(props: IVariedGridProps) => props.rowHeight}px - 2em);
  grid-gap: 2em;
`

interface IChildProps {
  span: any
}

const Child = styled.div`
  grid-row: span ${(props: IChildProps) => props.span};
  height: max-content;
`

export class VariedGrid extends React.Component<IVariedGridProps, {}> {
  public static defaultProps = {
    rowHeight: 40, // in pixels
    colWidth: `17em`
  }
  public state = { spans: [] }
  private ref = React.createRef<HTMLDivElement>()
  public sumUp = (acc: number, node: any) => acc + node.scrollHeight

  public computeSpans = () => {
    const { rowHeight } = this.props
    const spans: number[] = []
    if (this.ref.current) {
      Array.from(this.ref.current.children).forEach((child: any) => {
        const childHeight = Array.from(child.children).reduce(this.sumUp, 0)
        const span = Math.ceil(childHeight / rowHeight)
        spans.push(span + 1)
        child.style.height = span * rowHeight + `px`
      })
      this.setState({ spans })
    }
  }

  public componentDidMount() {
    this.computeSpans()
    window.addEventListener('resize', this.computeSpans)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.computeSpans)
  }

  public render() {
    return (
      <Parent ref={this.ref} {...this.props}>
        {this.props.children.map((child: any, i: number) => (
          // @ts-ignore
          <Child key={i} span={this.state.spans[i]}>
            {child}
          </Child>
        ))}
      </Parent>
    )
  }
}
