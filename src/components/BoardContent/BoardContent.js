import Column from "components/Column/Column";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import "./BoardContent.scss";

import { initialData } from "actions/initialData";
import { mapOrder } from "untilities/sort";

function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === "board-1");
        if (boardFromDB) {
            setBoard(boardFromDB);

            // sort column
            // boardFromDB.columns.sort((a, b) => {
            //     return boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id);
            // });

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
        }
    }, []);

    if (isEmpty(board)) {
        return <div className="not-found">Board not found!!!</div>;
    }

    return (
        <div className="board-content">
            {columns.map((column, index) => (
                <Column key={index} column={column} />
            ))}
        </div>
    );
}

export default BoardContent;
