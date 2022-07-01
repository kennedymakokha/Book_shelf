import React from 'react';
import MessageBox from '../common/messagebox';
import Filter from './filter'

const Addnote = props => {
    if (!props.show) {
        return null
    }
    return (
        <div className="modal">
            <div className="modal-content-wide">
                <div className="modal-header">
                    <h4 className="modal-title">New Notes</h4>
                </div>
                <div className="modal-body">
                    <div>
                        <form className="form "   onSubmit={props.submitNote}>

                            {/* {this.props.loading && <LoadingBox></LoadingBox>} */}
                            {props.errored && <MessageBox variant="danger">{props.error}{props.stateerror}</MessageBox>}


                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div className="input-container">
                                    <div className="label-container"><label htmlFor="email">Title</label></div>
                                    <input
                                        type="text"
                                        name="title"
                                        style={{ marginRight: "20px", width: "180px" }}
                                        id="type"
                                        placeholder="Enter notes title"
                                        required={true}
                                        onChange={(e) => props.handleChange(e)}
                                    ></input>

                                </div>

                                <div className="input-container">
                                    <div className="label-container"><label htmlFor="email">Level of study</label></div>
                                    <Filter required={true}  data={props.data} setData={props.handleCatChange} title="area of study" />
                                </div>
                                <div className="input-container">
                                    <div className="label-container"><label htmlFor="">Level Of Education</label></div>
                                    <Filter  required={true} data={props.levels} setData={props.handlevelChange} title="area of study" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <div className="input-container">
                                    <div className="label-container"><label htmlFor="">Instituition</label></div>
                                    {props.other ? <input
                                        type="text"
                                        name="instituition"
                                        style={{ marginRight: "10px" }}
                                        id="type"
                                        placeholder="Enter instituition name"
                                        required
                                        onChange={(e) => props.handleChange(e)}
                                    ></input> :
                                        <Filter data={props.instituitions} setData={props.handleinstChange} title="area of study" />
                                    }
                                </div>
                                <div className="input-container">
                                    <div className="label-container"><label htmlFor="">Course</label></div>
                                    <Filter  required={true} data={props.area} setData={props.handleareaChange} title="area of study" />

                                </div>
                                <div className="input-container">
                                    <div className="label-container"><label htmlFor="email">File</label></div>
                                    <input
                                        type="file"
                                        name="file"

                                        id="type"
                                        // placeholder="Enter notes title"
                                        required
                                        onChange={(e) => props.handlefileChange(e)}
                                    ></input>
                                    <h5>Choose a pdf File</h5>

                                </div>
                              
                            </div>
                           
                            <div className="input-container"style={{marginRight: "20px" }}>
                                <div className="label-container"><label htmlFor="email">Preface</label></div>
                                <textarea name="desc" onChange={props.handleChange}
                                    rows="3" cols="5"
                                    required={true}
                                    placeholder="Enter note preface"
                                />

                            </div>



                        </form>
                    </div>

                </div>
               
                <div className="modal-footer">
                    <button className="button" onClick={props.hide}>Cancel</button>
                    <button className="button" onClick={props.submitNote}>  {props.loading ? <i className="fa fa-spinner fa-spin"></i> : null}Save</button>
                </div>

            </div>

        </div>
    );

}
export default Addnote

