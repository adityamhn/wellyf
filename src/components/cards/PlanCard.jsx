import React from 'react'
import { Button, Card } from 'react-bootstrap'
import './card.scss'

const PlanCard = () => {
    return (
        <Card className="planCard">
            <Card.Body className="planCardBody">
                <div className="days">Your <span className="period"> first 4-week</span></div>
                <div className="desc">Healthy plan contains</div>
                <div className="plan-item">
                    Fried Brocolli with Garlic Shrimp
                </div>

                <Button className="bookBtn">Book Now</Button>
            </Card.Body>
        </Card>
    )
}

export default PlanCard
