import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './nav'
import { register, login, signout } from './../redux/actions/users'
class index extends Component {

    render() {

        return (
            <div className="body">

                <div className="grid-container" >
                    <Navbar />
                    <main style={{ marginTop: "30px" }}>
                        {this.props.children}
                    </main>
                    <footer className="row center">All right reserved learnnia.com</footer>
                </div>

            </div >

        );
    }
}

const mapStateToProps = (state) => {
    return {
        // loading: state.roomsData.loading,
        error: state.userSignin.error,
        loading: state.userSignin.loading,
        userInfo: state.userSignin.userInfo,

        // tenants: state.tenantData.tenants,
    }

};

export default connect(mapStateToProps, { register, login, signout })(withRouter(index));
