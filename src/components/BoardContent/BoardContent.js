import Column from "components/Column/Column";
import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";

import "./BoardContent.scss";

import { initialData } from "actions/initialData";
import { mapOrder } from "untilities/sort";
import { applyDrag } from "untilities/dragDrop";

function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === "board-1");
        if (boardFromDB) {
            setBoard(boardFromDB);

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
        }
    }, []);

    if (isEmpty(board)) {
        return <div className="not-found">Board not found!!!</div>;
    }

    const onColumnDrop = dropResult => {
        // console.log(dropResult);
        // return payload, addedindex, removedIndex

        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map(column => column.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    };

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns];

            // find columns active
            let currentColumn = newColumns.find(column => column.id === columnId);
            // edit cards active in each column
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            // update cardOrder
            currentColumn.cardOrder = currentColumn.cards.map(i => i.id);

            setColumns(newColumns);
        }
    };

    return (
        <div className="board-content">
            <Container
                // theo chieu ngang
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                // layout khi keo tha
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: "column-drop-preview",
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} />
                    </Draggable>
                ))}
            </Container>
            <div className="add-new-column">
                <i className="fa fa-plus icon"></i> Add another column
            </div>
        </div>
    );
}

export default BoardContent;
