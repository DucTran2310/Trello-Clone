import React from 'react'
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'
import './BoardBar.scss'

function BoardBar() {
  return (
    <nav className="navbar-board">
      <BootstrapContainer className="trello-navbar-container">
        <Row>
          <Col sm={10} xs={8} className="col-no-padding">
            <div className="board-info">
              <div className="item board-logo-icon"><i className="fa fa-coffe" />
                <strong>Trello-Clone-Project</strong>
              </div>
              <div className="divider"></div>

              <div className="item board-type">Private Workspace</div>
              <div className="divider"></div>

              <div className="item member-avatar">
                <img src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/216417714_2994318454177087_5129527537884189386_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MtVmB6qGrUIAX_vPZ7G&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT8T8gOxX6VuV0tavbXN5mIP24kxfyCQf73WfwB1Mqtwdg&oe=61CE5BA9" alt="member-avt" title="member-avt" />
                <img src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/216417714_2994318454177087_5129527537884189386_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MtVmB6qGrUIAX_vPZ7G&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT8T8gOxX6VuV0tavbXN5mIP24kxfyCQf73WfwB1Mqtwdg&oe=61CE5BA9" alt="member-avt" title="member-avt" />
                <img src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/216417714_2994318454177087_5129527537884189386_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MtVmB6qGrUIAX_vPZ7G&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT8T8gOxX6VuV0tavbXN5mIP24kxfyCQf73WfwB1Mqtwdg&oe=61CE5BA9" alt="member-avt" title="member-avt" />
                <img src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/216417714_2994318454177087_5129527537884189386_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MtVmB6qGrUIAX_vPZ7G&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT8T8gOxX6VuV0tavbXN5mIP24kxfyCQf73WfwB1Mqtwdg&oe=61CE5BA9" alt="member-avt" title="member-avt" />
                <img src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/216417714_2994318454177087_5129527537884189386_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MtVmB6qGrUIAX_vPZ7G&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT8T8gOxX6VuV0tavbXN5mIP24kxfyCQf73WfwB1Mqtwdg&oe=61CE5BA9" title="member-avt" />
                <span className="more-members">+5</span>
                <span className="invite">Invite</span>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={4} className="col-no-padding">
            <div className="board-actions">
              <div className="item menu"><i className="fa fa-ellipsis-h mr-2" /> Show Menu</div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  )
}

export default BoardBar
