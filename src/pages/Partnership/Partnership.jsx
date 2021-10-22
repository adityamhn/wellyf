import React from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import Navbar from '../../components/Navbar/Navbar'
import './Partnership.scss'

const data = [
    {
        title: 'From Spices to Slices',
        description: 'We are Zealots of the belief that every cuisine can be made healthy and that every Kitchen can contribute to our cause',
        image: '/images/offer1.svg'
    },
    {
        title: 'No Extra Expense',
        description: 'Leverage your own existing assets and staff. Upskill your staff in the process by providing them with exposure to Varieties.',
        image: '/images/offer2.svg'
    },
    {
        title: 'Standards are the recipe to success',
        description: 'We are in the business of providing customised-healthy-meals to our customers. You’ll receive standard processes for making of all dishes. And we trust you!',
        image: '/images/offer3.svg'
    },
    {
        title: 'Get the P for your Paisa',
        description: 'Generate additional revenue. Why be only one outlet when you can be more ? Yeh Kitchen maange more!',
        image: '/images/offer4.svg'
    },
]

const Partnership = () => {
    return (
        <>
            <Navbar />
            <Container fluid className="partnershipPage">
                <div className="wrapper">
                    <div className="topSection">
                        <div className="heading">Your kitchen is your asset. Do you make enough from it? </div>
                        <Card className="headerCard">
                            <div className="text1">
                                If not, <span className="diff">HOW?</span>
                            </div>
                            <div className="text1">
                                If not now, <span className="diff">WHEN?</span>
                            </div>
                        </Card>
                    </div>

                    <div className="whatWeOfferSection">
                        <h2 className="whatWeOffer">What we Offer?</h2>
                        {data.map((data, index) => (
                            <div
                                className="deetSection"
                                style={{
                                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                                }}
                                key={index}
                            >
                                <div className="deets">
                                    <h4 className="title">{data.title}</h4>
                                    <p className="theText">{data.description}</p>
                                </div>
                                <div
                                    style={{
                                        justifyContent: index % 2 !== 0 ? "flex-start" : "flex-end",
                                    }}
                                    className="ImageSec"
                                >
                                    <Image
                                        src={data.image}

                                        className="deetImage"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Partnership
