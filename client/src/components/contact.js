import React, { Component } from 'react';
import Layout from './layout';

class Contact extends Component {
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <div className="dark-wrapper">
                        <div className="container inner">
                            <input
                                type="email"
                                id="confirmPassword"
                                name="email"
                                placeholder="email"
                                required
                                onChange={(e) => this.handleChange(e)}
                            />
                            <textarea placeholder='Type here  ...' name="text" />
                            <button className="primary" style={{ float: 'right' }}>
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            </Layout >

        );
    }
}

export default Contact;