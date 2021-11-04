import Column from "components/Column/Column";
import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";

import "./BoardContent.scss";

import { initialData } from "actions/initialData";
import { mapOrder } from "untilities/sort";

function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardFromDB = initialData.boards.find(
            board => board.id === "board-1"
        );
        if (boardFromDB) {
            setBoard(boardFromDB);

            // sort column
            // boardFromDB.columns.sort((a, b) => {
            //     return boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id);
            // });

            setColumns(
                mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id")
            );
        }
    }, []);

    if (isEmpty(board)) {
        return <div className="not-found">Board not found!!!</div>;
    }

    const onColumnDrop = dropResult => {
        console.log(dropResult);
        // return payload, addedindex, removedIndex
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
                        <Column column={column} />
                    </Draggable>
                ))}
            </Container>
        </div>
    );
}

export default BoardContent;
