import React, { Component } from 'react';

class error extends Component {
    render() {
        return (
            <div className="row center" style={{ height: "100vh", backgroundColor: '#87CEEB' }}>
                <div className="center" style={{ flexDirection: 'column' }}>
                    <i className="fas fa-exclamation-circle"></i>
                    <h1 style={{ color: 'tomato' }}> 404 ERROR Page not found</h1>
                </div>

            </div>
        );
    }
}

export default error;