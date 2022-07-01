import React from 'react';




const NoticationToast = props => {
    if (!props.show) {
        return null
    }
    // const redirect = props.location.search
    // ? props.location.search.split('=')[1]
    // : '/';
    return (
        <div className="modal-bottom">
            <div className="modal-content">
                {/* <div className="modal-header">
                    <h4 className="modal-title">modaltiltle</h4>
                </div> */}
                <div className="modal-body">
                    <div className="Modal-close-button" onClick={props.hide}>X</div>

                    <div className="comment-form-wrapper" >
                        <div className="comment-form" name="form_name" >
                            <div className="message-field">
                                <textarea
                                    name="textarea"
                                    required
                                    id="textarea"
                                    onChange={props.onChange}
                                    rows="5" cols="30"
                                    placeholder={props.comments !== undefined && props.comments.length === 0 ? "Be the First to reply here..." : "Enter your reply here..."}></textarea>
                            </div>
                           
                            <button onClick={props.submit} className="btn btn-submit" >Submit</button>
                        </div>
                    </div>
                </div>
                {/* <div className="modal-footer">
                    <button className="button" onClick={props.close}>close</button>
                </div> */}
            </div>

        </div>
    );

}
export default NoticationToast

