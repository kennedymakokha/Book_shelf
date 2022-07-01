import React, { Component } from 'react';
import './conversaton.css'
import N from './../../images/no-image.jfif'

class Conversations extends Component {

    render() {

        const { fetchsms, currUser, data } = this.props
        const { members } = data
        const k = members.find((m) => m._id !== currUser)

        return (
            <div className="conversaton" onClick={fetchsms} >
                <div className="ChatImageContainer">
                    <img alt="" src={k !== undefined && k.profileImage ? k.profileImage : N} className="chatOnlineFriendImage"  />
               
                    {this.props.smsCount > 0 ? <div className="msgBadge">
                        {this.props.smsCount}
                    </div> : null}
                </div>
                {/* <img className="conversationImage" alt="" src={k !== undefined && k.profileImage ? k.profileImage : `https://www.tnstate.edu/agriculture/resumes/images/SHaile.jpg`} /> */}
                <span className="conversationName" >{k !== undefined && k.firstname} {k !== undefined && k.surname}</span>

            </div>
        );

    }
}


export default Conversations