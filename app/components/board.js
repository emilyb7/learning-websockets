import React from 'react';

const Board = props => {

  if (props.value.messages.some(msg => msg.sent === false)) {
    props.actionSend();
  }

  const classNames = space => {
    const class1 = "space";
    const class2 = "counter" + (space > -1 ? props.value.players.find(p => p.id === space).counter : "");
    return [class1, class2].join(' ');
  }

  const rows = props.value.game.board.map((row, rowIndex) =>
    <div
      className={"row "}
      key={`row_${rowIndex}`}
    >
      { row.map((space, colIndex) => <div
        className={classNames(space)}
        key={`space-${rowIndex}:${colIndex}`}
        id={`${rowIndex}:${colIndex}`}
        onClick={ props.actionMove }
      >{space > -1 ? props.value.players.find(p => p.id === space).counter : ""}</div>)
    } </div>);

  return (<div id={"board"} className={"board"}>{ rows }</div>);
}

export default Board;
