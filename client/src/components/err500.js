import React, { Component } from 'react';

class Err500 extends Component {
    render() {
        return (
            <div className="center" style={{ backgroundColor: 'yellow', height: "100vh", diaplay: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
                <h2>Error 500 Server is down</h2>

            </div>
        );
    }
}

export default Err500;