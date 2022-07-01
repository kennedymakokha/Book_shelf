import React from 'react';

import MessageBox from '../common/messagebox';


const AddReply = props => {
    if (!props.show) {
        return null
    }
    // const redirect = props.location.search
    // ? props.location.search.split('=')[1]
    // : '/';
    return (
        <div className="modal">
            <div className="modal-content">
                {/* <div className="modal-header">
                    <h4 className="modal-title">modaltiltle</h4>
                </div> */}
                <div className="modal-body">
                    <div>
                        <div className="form min" >
                            <div>
                                <h1>Reply</h1>
                            </div>
                            {/* {this.props.loading && <LoadingBox></LoadingBox>} */}
                            {props.errored && <MessageBox variant="danger">{props.error}</MessageBox>}

                            <div>
                                <label htmlFor="email">reply</label>
                                <textarea onChange={props.handleChange} name="body" />
                            </div>

                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button className="button" onClick={props.hide}>Cancel</button>
                    <button className="button" onClick={props.submit}>Save</button>
                </div>

            </div>

        </div>
    );

}
export default AddReply

