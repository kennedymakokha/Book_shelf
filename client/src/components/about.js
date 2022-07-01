import React, { Component } from 'react';
import Layout from './layout/index'
// import Who from "./images/who.jpg"
class About extends Component {
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <div className="about-header">
                        <h2 style={{ textTransform: 'capitalize', color: "white" }}>About Us</h2>

                        <span>The perfect choice for your study</span>
                    </div>
                    <div className="dark-wrapper">
                        <div className="container inner">
                            <h2 style={{ textAlign: 'center', fontFamily: 'serif' }}>We are Porto, We Create
                                Build &
                                Develop Content</h2>
                            <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                            <div className="row">
                                <div className="about-item">
                                    <h1>OUR <span className="tertiary">MISSION</span></h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum, nulla vel pellentesque consequat, ante nulla hendrerit arcu.</p>
                                </div>
                                <div className="about-item">
                                    <h1><span className="primary">OUR</span> VISION</h1>
                                </div>
                                <div className="about-item">
                                    <h1><span className="tertiary">WHY</span><span className="primary"> US</span></h1>
                                </div>
                            </div>
                            <div >
                                <h1 style={{ textAlign: "center", textTransform: 'uppercase' }}>Who we are</h1>
                                <div className="row">
                                    <div className="who-we-are">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit massa enim. Nullam id varius nunc.

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc. Vivamus bibendum magna ex, et faucibus lacus venenatis eget</p>
                                    </div>
                                    <div className="who-we-are-image">
                                        <h1 className="tertiary">We are all you need</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default About;