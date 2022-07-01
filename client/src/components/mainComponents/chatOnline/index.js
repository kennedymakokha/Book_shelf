import React, { Component } from 'react';
import './chatonline.css'
import N from './../../images/no-image.jfif'
class ChatOnline extends Component {

    render() {
        const { data,  add } = this.props
        return (
            <div className="chatOnline" onClick={add}>
                <div className="OnlineFriend">
                    <div className="ChatImageContainer">
                    <img alt="" src={data !== undefined && data.profileImage ? data.profileImage : N} className="chatOnlineFriendImage"  />
                        <div className="chatOnlineBadge">

                        </div>
                    </div>
                    <span className="chatOnlineName">{data.name} {data.surname}</span>
                </div>
            </div>
        );
    }
}

export default ChatOnline;