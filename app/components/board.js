import React from 'react';

const Board = props => {
  console.log(props.value);
  const rows = props.value.game.board.map((row, rowIndex) =>
    <div
      className={"row"}
      key={`row_${rowIndex}`}
    >
      { row.map((_, colIndex) => <div
        className={"space"}
        key={`space-${rowIndex}:${colIndex}`}
        id={`${rowIndex}:${colIndex}`}
        onClick={ props.actionMove }
      ></div>)
    } </div>);

  return (<div id={"board"}>{ rows }</div>);
}

export default Board;
