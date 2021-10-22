import React from 'react'
import { Container, Image } from 'react-bootstrap'
import './Navbar.scss'

const Navbar = () => {
    return (
        <Container fluid className="navbar-container">
            <div className="navbar-wrapper">
                <Image src={'/images/logo.svg'} className="navbar-logo" />
            </div>
            </Container>
    )
}

export default Navbar
