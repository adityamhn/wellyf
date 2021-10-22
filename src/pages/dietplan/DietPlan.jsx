import React from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import PlanCard from '../../components/cards/PlanCard'
import Navbar from '../../components/Navbar/Navbar'
import './DietPlan.scss'

const DietPlan = () => {
    return (
        <>
            <Navbar />
            <Container fluid className="dietPlan-container">
                <div className="wrapper">
                    <div className="topSection">
                        <Card className="homeCard">
                            <h1 className="heading">Time to take Notes!</h1>
                            <h4 className="subheading">Get started on your <span className="diff">wellness</span> Journey</h4>
                        </Card>

                        <div className="scroll-sec">
                            <div className="scroll-text">Scroll for your diet</div>
                        </div>
                    </div>
                    <div className="bodySection">
                        <div className="mainText">If you can <span className="diff">Dream</span>, and not make <span className="diff">dreams your master…</span></div>
                        <div className="theText">Here’s some inspiration for you to become your BEST SELF</div>
                        <Image src={'/images/loss.png'} className="swiper-img" />
                        <div className="theText">And here’s something we can do to help</div>
                        <div className="theText">You focus on your work out, we’ll work your Diet out!</div>

                        <div className="plan-cards">
                        <PlanCard />
                        <PlanCard />
                        <PlanCard />
                        </div>

                        <Button className="tryButton">Try 3 days plan</Button>
                        <Button className="planButton">Get my free diet plan now</Button>

                    </div>
                </div>

            </Container>
        </>
    )
}

export default DietPlan
