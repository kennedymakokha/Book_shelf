import React, { Component } from 'react';

class onlineList extends Component {
    render() {
        const { data } = this.props
        return (
            <li>
                <i className="fa fa-user"></i> <span className="chatListli">{data.firstname} {data.surname}</span>
                <hr />
            </li>
        );
    }
}

export default onlineList;