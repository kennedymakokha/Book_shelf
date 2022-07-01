import React from 'react';

import Not from './../images/notauth.png'

const NotAuthorized = props => {
    if (!props.show) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" style={{ textAlign: 'center' }}>Not Authorized</h4>
                    <div className="Modal-close-button" onClick={props.hide}>X</div>
                </div>
                <div className="modal-body">


                    <div className="comment-form-wrapper" >
                        <div className="comment-form" name="form_name" >
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}><img src={Not} alt="" height={100} width={100} style={{ justifySelf: 'center' }} /></div>
                                <h1 style={{ textAlign: 'center' }}>Kindly Log in to like</h1>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );

}
export default NotAuthorized

