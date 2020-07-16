import * as React from 'react';

interface MyProps {
  color: string;
  onClick: () => void;
  widthOfSquare: number;
  key: string;
}

interface MyState {}

export default class Square extends React.Component <MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps: MyProps) {
    if (nextProps.color !== this.props.color) {
      return true;
    }

    return false;
  }

  render() {
    const divStyle = {
      backgroundColor: this.props.color,
      height: this.props.widthOfSquare + "px",
      width: this.props.widthOfSquare + "px",
      lineHeight: this.props.widthOfSquare + "px",
    }
    return (
      <button
        className="square"
        style={divStyle}
        onClick={() => this.props.onClick()}>
      </button>
    );
  }
}