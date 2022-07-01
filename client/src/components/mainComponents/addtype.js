import React from 'react';

import MessageBox from '../common/messagebox';


const AddType = props => {
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
                                <h1>Add {props.category}</h1>
                            </div>
                            {/* {this.props.loading && <LoadingBox></LoadingBox>} */}
                            {props.errored && <MessageBox variant="danger">{props.error}</MessageBox>}

                            <div>
                                <label htmlFor="email">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="type"
                                    placeholder="Enter name"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                ></input>
                            </div>
                            {props.category === "types" ? null : <div>
                                <label htmlFor="email">Level</label>
                                <select
                                    style={{}}
                                    onChange={props.handleCatChange}
                                >
                                    <option>Select a category</option>
                                    {props.data.map((cat, i) => (
                                        <option value={cat._id} key={i}>{cat.name}</option>
                                    ))
                                    }

                                </select>
                            </div>}
                            {props.category !== "courses" ? null : <div>
                                <label htmlFor="">Level Of Education</label>
                                <select
                                    style={{}}
                                    onChange={props.handlelevelChange}
                                >
                                    <option>Select a category</option>
                                    {props.levels.map((cat, i) => (
                                        <option value={cat._id} key={i}>{cat.name}</option>
                                    ))
                                    }

                                </select>

                            </div>}

                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button className="button" onClick={props.hide}>Cancel</button>
                    <button className="button" onClick={props.category === "courses" ? props.submitCourse : props.category === "level" ? props.submitlevel : props.category === "instituitions" ? props.submitins : props.submit}>Save</button>
                </div>

            </div>

        </div>
    );

}
export default AddType

