import React from 'react';
import { Link } from 'react-router-dom';
import MessageBox from '../common/messagebox';

const loginModal = props => {
    if (!props.show) {
        return null
    }
    console.log(props.error)
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
                    <div className="form">

                        {/* {loading && <LoadingBox></LoadingBox>}*/}
                        {props.errored && <MessageBox variant="danger">{props.error}</MessageBox>}

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="input-container" style={{ width: '50%', paddingRight: "10px" }}>
                                <label htmlFor="firstname" className="label-container" >First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter First name"

                                    onChange={(e) => props.handleChange(e)}
                                />
                            </div>
                            <div className="input-container" style={{ width: '50%', paddingRight: "10px" }}>
                                <label htmlFor="name" className="label-container" >Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder="Enter surname"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="input-container" style={{ width: '50%', paddingRight: "10px" }} >
                                <label htmlFor="name" className="label-container" >Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </div>
                            <div className="input-container" style={{ width: '50%', paddingRight: "10px" }}>
                                <label htmlFor="name" className="label-container" >Phone Number</label>
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                            <div className="input-container" style={{ width: '50%', paddingRight: "10px" }}>
                                <label htmlFor="password " className="label-container" >Password</label>
                                <input
                                    type="password"

                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </div>
                            <div className="input-container" style={{ width: '50%', paddingRight: "10px" }}>
                                <label htmlFor="confirmPassword" className="label-container" >Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="password_confirm"
                                    placeholder="Enter confirm password"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </div>

                        </div>

                        <div>
                            <label />
                            <button className="primary" onClick={props.submit}>
                                {props.loading ? <i className="fa fa-spinner fa-spin"></i> : null}  Register
                            </button>
                        </div>
                        <div>
                            <label />
                            <div>
                                Already have an account?{' '}
                                <Link to={``} onClick={props.login} style={{color:'red'}}>Sign-In</Link>
                            </div>
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
export default loginModal

