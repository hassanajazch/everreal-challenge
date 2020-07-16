import * as React from 'react';
import Board from './Board';

interface MyProps {}
interface MyState {
  widthOfSquare: number;
  squaresPerRow: number;
  numberOfColors: number;
  includeDiagonals: boolean;
  colors: string[];
  squares?: any;
}

export default class Game extends React.Component <MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      widthOfSquare: 25,
      squaresPerRow: 20,
      numberOfColors: 3,
      includeDiagonals: false,
      colors: this.generateColors(3),
    }
  }

  componentWillMount() {
    const squares : any = this.generateSquares(
        this.state.colors,
        this.state.squaresPerRow,
        this.state.numberOfColors
    );

    this.setState ({
      squares: squares
    });
  }

  /**
   * Generate colors
   * @param numberOfColors
   */
  generateColors(numberOfColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numberOfColors; i++) {
      colors[i] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    return colors;
  }

  /**
   * generate squares for board
   * @param colors
   * @param squaresPerRow
   * @param numberOfColors
   */
  generateSquares(colors: string[], squaresPerRow: number, numberOfColors: number) {
    const squares: any = []
    for(let i = 0; i < squaresPerRow; i++) {
      squares[i] = [];
      for(let j = 0; j < squaresPerRow; j++) {
        squares[i][j] = {
          color: this.getColor(colors, numberOfColors),
          visited: false
        }
      }
    }

    return squares;
  }

  getColor(colors: string[], numberOfColors: number): string {
    const numberBetweenZeroAndFour = Math.floor((Math.random() * numberOfColors));

    return colors[numberBetweenZeroAndFour];
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            widthOfSquare={this.state.widthOfSquare}
            squaresPerRow={this.state.squaresPerRow}
            numberOfColors={this.state.numberOfColors}
            includeDiagonals={this.state.includeDiagonals}
            squares={this.state.squares}
            colors={this.state.colors}
          />
        </div>
      </div>
    );
  }
}
