import * as React from 'react';
import Square from './Square';

interface MyProps {
  widthOfSquare: number;
  squaresPerRow: number;
  numberOfColors: number;
  includeDiagonals: boolean;
  colors: string[];
  squares?: any;
}
interface MyState {}

export default class Board extends React.Component <MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  floodFillRecursive(i: number, j: number) {
    const oldColor: string = this.props.squares[i][j].color;
    const newColor: string = this.getUniqueRandomColor(oldColor);
    const squares: any = this.props.squares.slice();

    this.floodFillRecursiveHelper(squares, i, j, oldColor, newColor);
    this.clearVisisted(squares);
    this.setState({ squares: squares });
  }

  /**
   * Recursive Flood Fill Algorithm
   * @param squares
   * @param i
   * @param j
   * @param oldColor
   * @param newColor
   */
  floodFillRecursiveHelper(squares: any, i: number, j: number, oldColor: string, newColor: string) {
    // check out of bounds
    if (i < 0 || i > this.props.squaresPerRow - 1) return;
    if (j < 0 || j > this.props.squaresPerRow - 1) return;
    // check if it's visited
    if (squares[i][j].visited) return;
    // Indicate node has been visited
    squares[i][j].visited = true;
    // check if it's same color
    if (squares[i][j].color !== oldColor) return;
    // set the current color to the new color and mark node as visited.
    squares[i][j].color = newColor;
    // recurse through up, down, left, right boxes.
    this.floodFillRecursiveHelper(squares, i + 1, j, oldColor, newColor);
    this.floodFillRecursiveHelper(squares, i - 1, j, oldColor, newColor);
    this.floodFillRecursiveHelper(squares, i, j + 1, oldColor, newColor);
    this.floodFillRecursiveHelper(squares, i, j - 1, oldColor, newColor);
  }

  getUniqueRandomColor(color: string): string {
    const numberBetweenZeroAndFour: number = Math.floor((Math.random() * this.props.numberOfColors));

    if (color === this.props.colors[numberBetweenZeroAndFour]) {
      return this.getUniqueRandomColor(color);
    } else {
      return this.props.colors[numberBetweenZeroAndFour];
    }
  }

  clearVisisted(squares: any) {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        squares[i][j].visited = false;
      }
    }
  }

  renderSquare(i: number, j: number) {
    return <Square
      color={this.props.squares[i][j].color}
      onClick={() => this.floodFillRecursive(i, j)}
      widthOfSquare={this.props.widthOfSquare}
      key={i + "," + j}
    />;
  }

  /**
   * create board table with squares
   */
  createTable(): JSX.Element[] {
    let table = []
    
    for (let i = 0; i < this.props.squaresPerRow; i++) {
      let children = []
      // Inner loop to create children
      for (let j = 0; j < this.props.squaresPerRow; j++) {
        children.push(this.renderSquare(i, j))
      }
      // Create the parent and add the children
      table.push(<div className="board-row" key={i}>{children}</div>)
    }

    return table
  }

  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    );
  }
}