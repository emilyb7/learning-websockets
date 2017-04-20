import React from 'react';

const Board = ({ currentPlayer, game, players, actionMove, }) => {

  const classNames = space => {
    const class1 = "space";
    const class2 = "counter" +
      space > -1
      ? players.find(p => p.id === space).counter
      : "";
    return [class1, class2].join(' ');
  }

  const rows = game.board.map((row, rowIndex) =>
    <div
      className="row "
      key={ `row_${rowIndex}` }
    >
      {
        row.map((space, colIndex) => <div
        className={ classNames(space) }
        key={ `space-${rowIndex}:${colIndex}` }
        id={ `${rowIndex}:${colIndex}` }
        onClick={ actionMove }
      >{ space > -1 ? players.find(p => p.id === space).counter : "" }
    </div>
  )
    }
  </div>
);

  return (
    <div id="board" className="board">
      { rows }
    </div>
  );
}

export default Board;
