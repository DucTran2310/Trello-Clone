import Column from 'components/Column/Column'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as ContainerBootstrap, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import { initialData } from 'actions/initialData'
import { mapOrder } from 'untilities/sort'
import { applyDrag } from 'untilities/dragDrop'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([]) //array null
  const [openColumn, setOpenColumn] = useState(false)

  const newColumnInputRef = useRef(null)

  const [newColumnTitle, setColumnTitle] = useState('') //string null

  const onNewColumnTitleChange = useCallback(e => setColumnTitle(e.target.value), [])

  // Initial data
  useEffect(() => {
    // return the first object match
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  // Focus and select input (có nháy trong input và tô đậm)
  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openColumn])

  // lodash empty
  if (isEmpty(board)) {
    return <div className="not-found"> Board not found!!! </div>
  }

  const onColumnDrop = dropResult => {
    // console.log(dropResult);
    // return payload, addedindex, removedIndex

    // destructuring clone 1 array ra array moi
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    // Cập nhật columnOrder và column
    newBoard.columnOrder = newColumns.map(column => column.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      // find columns active
      let currentColumn = newColumns.find(column => column.id === columnId)
      // edit cards active in each column
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      // update cardOrder
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)

      setColumns(newColumns)
    }
  }

  const toggleOpenNewColumn = () => {
    setOpenColumn(!openColumn)
  }

  const addNewColumn = () => {
    // Nếu string rỗng thì focus
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      // random 5 characters
      id: Math.random().toString(36).substr(2, 5), //will remove when we implement code api
      boardId: board.id,
      title: newColumnTitle.trim(), // cắt khoảng trống đầu cuối
      cardOrder: [],
      cards: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(column => column.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setColumnTitle('')
    toggleOpenNewColumn()
  }

  return (
    <div className="board-content">
      <Container
        // theo chieu ngang
        orientation="horizontal"
        onDrop={onColumnDrop}
        // Update data khi kéo thả data
        getChildPayload={index => columns[index]}
        // Chỉ kéo thả khi ở header
        dragHandleSelector=".column-drag-handle"
        // layout khi keo tha
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />{' '}
          </Draggable>
        ))}{' '}
      </Container>{' '}
      <ContainerBootstrap className="trello-container-bootstrap">
        {' '}
        {!openColumn && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumn}>
              <i className="fa fa-plus icon" /> Add another column{' '}
            </Col>{' '}
          </Row>
        )}{' '}
        {openColumn && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                // focus input
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                // Sự kiện gõ phím
                onKeyDown={e => e.key === 'Enter' && addNewColumn()}
              />{' '}
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column{' '}
              </Button>{' '}
              <span
                className="cancel-new-column"
                onClick={toggleOpenNewColumn}
              >
                <i className="fa fa-trash" />
              </span>{' '}
            </Col>{' '}
          </Row>
        )}{' '}
      </ContainerBootstrap>{' '}
    </div>
  )
}

export default BoardContent
