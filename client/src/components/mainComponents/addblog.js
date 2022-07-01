import React from 'react';

import MessageBox from '../common/messagebox';


const Addblog = props => {
    if (!props.show) {
        return null
    }
    // const redirect = props.location.search
    // ? props.location.search.split('=')[1]
    // : '/';
    return (
        <div className="modal">
            <div className="modal-content-wide">
                {/* <div className="modal-header">
                    <h4 className="modal-title">modaltiltle</h4>
                </div> */}
                <div className="modal-body">
                    <div className="Modal-close-button" onClick={props.hide}>X</div>

                    <div className="comment-form-wrapper" >
                        <div className="comment-form" name="form_name" >
                            <div className="message-field">

                                <input
                                    type="text"
                                    name="title"
                                    style={{ marginRight: "10px" }}
                                    id="type"
                                    placeholder="Enter Title"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                ></input>

                                <textarea
                                    name="body"
                                    required
                                    id="textarea"
                                    onChange={(e) => props.handleChange(e)}
                                    rows="5" cols="30"
                                    placeholder="Type Blog  here..." ></textarea>
                                <input
                                    type="file"
                                    name="file"
                                    style={{ marginBottom: "20px" }}
                                    id="type"
                                    // placeholder="Enter notes title"
                                    required
                                    onChange={props.handlefileChange}
                                ></input>
                                {props.fileErr ? <p style={{color:'red'}}>{props.fileErr}</p> : null}
                            </div>
                            {props.errored && <MessageBox variant="danger">{props.error}</MessageBox>}

                            <button onClick={props.submitBlog} className="btn btn-submit" > {props.loading ? <i className="fa fa-spinner fa-spin"></i> : null} Submit</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );

}
export default Addblog

