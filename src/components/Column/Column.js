import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { mapOrder } from 'untilities/sort'
import { MODAL_ACTION_CONFIRM } from 'untilities/constants'
import { saveContentAfterPressEnter, selectAllInLineText } from 'untilities/contentEditable'


function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal)
  }

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [openCard, setOpenCard] = useState(false)
  const toggleOpenNewCard = () => setOpenCard(!openCard)

  const newCardTextAreaRef = useRef('')

  const [newCardTitle, setCardTitle] = useState('') //string null
  const onNewCardTitleChange = e => setCardTitle(e.target.value)

  // Khi thay doi title useEffect moi chay, neu ko la chay vo han
  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  // Focus and select input (có nháy trong input và tô đậm)
  useEffect(() => {
    if (newCardTextAreaRef && newCardTextAreaRef.current) {
      newCardTextAreaRef.current.focus()
      newCardTextAreaRef.current.select()
    }
  }, [openCard])

  const onConfirmModalAction = (type) => {
    // console.log(type)
    // if (type === MODAL_ACTION_CLOSE) {

    // }
    if (type === MODAL_ACTION_CONFIRM) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  // su kien khi blur
  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  // add new card
  const addNewCard = () => {
    // Nếu string rỗng thì focus
    if (!newCardTitle) {
      newCardTextAreaRef.current.focus()
      return
    }

    const newCardToAdd = {
      // random 5 characters
      id: Math.random().toString(36).substr(2, 5), //will remove when we implement code api
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim(), // cắt khoảng trống đầu cuối
      cover: null
    }

    //console.log(column)
    // cloneDeep ko lam thay doi data goc
    let newColumn = cloneDeep(column)
    // push them 1 ptu vao cuoi card va card order
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd._id)

    //console.log(newColumn)
    onUpdateColumn(newColumn)
    setCardTitle('')
    toggleOpenNewCard()
  }

  return (
    <div className="column">
      {/* Kéo thả khi ở header */}
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            // Sự kiện gõ phím
            onKeyDown={saveContentAfterPressEnter}
            // khi keo tha ko bi focus
            onClick={selectAllInLineText}
            onMouseDown={e => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCard}>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal} >Remove column...</Dropdown.Item>
              <Dropdown.Item>Move all card in this column (beta)...</Dropdown.Item>
              <Dropdown.Item>Archive all card in this column (beta)...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          orientation="vertical"
          // kéo thả cart bên trong lẫn ngoài column
          groupName="col"
          onDrop={dropResult => onCardDrop(column._id, dropResult)}
          getChildPayload={index => cards[index]}
          // css kéo thả card
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openCard &&
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card..."
              className="textarea-enter-new-card"
              // focus input
              ref={newCardTextAreaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              // // Sự kiện gõ phím
              onKeyDown={e => e.key === 'Enter' && addNewCard()}
            />
          </div>
        }
      </div>
      <footer>
        {openCard &&
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add card
            </Button>
            <span
              className="cancel-icon" onClick={toggleOpenNewCard}
            >
              <i className="fa fa-trash" />
            </span>
          </div>
        }
        {!openCard &&
          <div className="footer-actions" onClick={toggleOpenNewCard}>
            <i className="fa fa-plus icon"></i> Add another card
          </div>
        }
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title='Remove Column'
        content={`Are you sure you want to remove <strong>${column.title}</strong>.<br />All related cards will also be removed!!!`}
      />
    </div>
  )
}

export default Column
