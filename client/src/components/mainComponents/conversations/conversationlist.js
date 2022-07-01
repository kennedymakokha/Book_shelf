import React, { Component } from 'react';
import './conversaton.css'


class Conversations extends Component {

    render() {

        const { fetchsms, currUser, data } = this.props
        const { members } = data
        const k = members.find((m) => m._id !== currUser)

        return (
            <li onClick={fetchsms} >
                <i className="fa fa-user"></i><span style={{ fontSize: 10, textTransform: 'capitalize' }}> {k !== undefined && k.firstname} {k !== undefined && k.surname}</span>
                <hr />
            </li>
        );

    }
}


export default Conversations