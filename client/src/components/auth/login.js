import React from 'react';
import { Link } from 'react-router-dom';
import MessageBox from '../common/messagebox';
import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
    // alert(JSON.stringify(response.profileObj));
}

const loginModal = props => {
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
                                <h1>Sign In</h1>
                            </div>
                            {/* {this.props.loading && <LoadingBox></LoadingBox>} */}
                            {props.errored && <MessageBox variant="danger">{props.error}</MessageBox>}

                            <div>
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    onChange={(e) => props.handleChange(e)}
                                ></input>
                            </div>
                            <div>
                                <label />
                                <button className="primary block" onClick={props.submit}>
                                    {props.loading ? <i className="fa fa-spinner fa-spin"></i> : null}  Sign In
                                </button>

                                <GoogleLogin
                                    clientId={'457770327011-4gfne7v32qr03pipvr52umcmumtdqkgo.apps.googleusercontent.com'}
                                    onSuccess={props.gmaillogin}
                                   
                                    onFailure={responseGoogle}
                                    className="googleButton"
                                >
                                    <i name='fa fa-google'></i>
                                    <span> Login with Google</span>
                                </GoogleLogin>
                                

                            </div>
                            <div>
                                <label />
                                <div >
                                    <Link to='/' style={{color:'red'}} onClick={props.register}>
                                        Create your account
                                    </Link>
                                </div>
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

