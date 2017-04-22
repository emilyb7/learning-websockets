import React from 'react';

const Board = ({ currentPlayer, game, players, actionMove, }) => {

  const classNames = space => {
    const class1 = "space";
    const class2 = "counter" + (
      space > -1
        ? players.find(player => player.id === space).counter
        : ""
      );
    return [class1, class2].join(' ');
  }

  const getCounter = (space, players) => space > -1
    ? players.find(player => player.id === space).counter
    : '';

  const getSpaces = (row, rowIndex, players) => {
    return row.map((space, columnIndex) => {
      return (
        <div
          className={ classNames(space) }
          key={ `space-${rowIndex}:${columnIndex}` }
          id={ `${rowIndex}:${columnIndex}` }
          onClick={ actionMove }
        >{ getCounter(space, players) }</div>
      );
    });
  };

  const rows = game.board.map((row, rowIndex) => (
    <div
      className="row "
      key={ `row_${rowIndex}` }
    >{ getSpaces(row, rowIndex, players) }</div>)
  );

  return (
    <div id="board" className="board">
      { rows }
    </div>
  );
}

export default Board;
