import React, { useState, useEffect, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'

import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { mapOrder } from 'untilities/sort'
import { MODAL_ACTION_CONFIRM } from 'untilities/constants'
import { saveContentAfterPressEnter, selectAllInLineText } from 'untilities/contentEditable'


function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal)
  }

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = useCallback((e) =>
    setColumnTitle(e.target.value), []
  )

  // Khi thay doi title useEffect moi chay, neu ko la chay vo han
  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

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
              <Dropdown.Item>Add card...</Dropdown.Item>
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
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon"></i> Add another card
        </div>
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
