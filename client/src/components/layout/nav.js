import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from './../auth/login'
import Register from './../auth/register'
import { getinstituitions, getinstituitionswithtypes } from './../redux/actions/instituition'
import { getlevelswithtypes, getlevels } from './../redux/actions/level'
import { getareaswithtypes, getareas } from './../redux/actions/area'
import { gettypes } from './../redux/actions/types'
import { getnotes, postnotes } from './../redux/actions/notes'
import { register, detailsUser, login, signout, GmailLogin } from './../redux/actions/users'
import Addnote from '../mainComponents/adddNote';
import Logo from './../images/logo.png'
// import { io } from 'socket.io-client'
// const socket = io("https://api.learnnia.com");
class nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            type: '',

            instituition: '',
            level: '',
            desc: '',
            area: '',
            stateerror: '',
            showaddNote: false,
            email: '',
            error: '',
            other: false,
            errored: false,
            authenticated: false,
            loading: false,
            password: '',
            showRegModal: false,
            firstname: '',
            surname: '',
            phone: '',
            password_confirm: '',
            file: '',
            page: 1,
            limit: 8,
            activeTab: 1,
        }
    }

    handlefileChange = (e) => {

        const file = e.target.files[0]

        if (file.type !== "application/pdf") {
            this.setState({
                errored: true,
                stateerror: "Kindly select a Pdf file"
            })
        }

        this.setState({
            [e.target.name]: file,
            errored: false
        })

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errored: false
        })
        console.log(e.target.value)

    }
    onRegister = async () => {
        try {

            this.setState({ loading: true })
            const { email, password, firstname, surname, phone, password_confirm } = this.state

            const data = { email, password, firstname, surname, phone, password_confirm }
            this.setState({
                show: false,
                showRegModal: false,
            })
            await this.props.register(data)
            alert('successfully registered')
            this.setState({
                show: false,
                showRegModal: false,
            })

        } catch (error) {
            alert(error)
            // this.setState({
            //     show: false,
            //     showRegModal: true, error: error, errored: true
            // })

        }

    }
    signoutHandler = async () => {
        await this.props.signout();
        this.setState({ authenticated: false })
        await this.props.history.push('/');
    };
    handleCatChange = async (e) => {

        const data = { type: e.target.value }
        await this.props.getlevelswithtypes(data)
        await this.props.getinstituitionswithtypes(data)
        this.setState({ type: e.target.value })

    }
    handleinstChange = async (e) => {
        this.setState({ instituition: e.target.value })
        if (e.target.value === "other") {
            this.setState({ other: true })
        }

    }
    handleareaChange = async (e) => {
        this.setState({ area: e.target.value })

    }
    fetchnotedata = async () => {
        await this.props.getnotes(this.state.page, this.state.limit)
        this.setState({ activeTab: this.state.page })
    }
    handlevelChange = async (e) => {
        this.setState({ level: e.target.value })

    }
    glogin = async (response) => {

        try {
            this.setState({ loading: true })
            await this.props.GmailLogin(response)
            this.setState({ show: false, authenticated: true, errored: false })
            if (this.props.userinfo.isAdmin === true) {
                await this.props.history.push('/admin/dashboard');
            }
        } catch (error) {

            this.setState({ error: error, errored: true })
        }

    }
    onSubmit = async () => {
        try {
            this.setState({ loading: true })
            const { email, password } = this.state
            await this.props.login(email, password)
            this.setState({ show: false, authenticated: true, errored: false })
            if (this.props.userinfo.isAdmin === true) {
                await this.props.history.push('/admin/dashboard');
            }
        } catch (error) {

            this.setState({ error: error, errored: true })
        }

    }
    submitNote = async () => {
        try {
            const { instituition, type, level, title, file, area, desc } = this.state

            const data = { instituition, type, level, title, file, area, desc }

            await this.props.postnotes(data)
            await this.fetchnotedata()
            this.setState({ showaddNote: false })

        } catch (error) {
            this.setState({ errored: true, error: this.props.notesErr })
        }
    }
    componentDidMount = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('userInfo'))
            await this.props.gettypes()
            await this.props.getinstituitions()
            await this.props.getlevels()
            await this.props.getareas()
            const { _id } = user
            // await this.fetchnotedata()
            if (user) {
                await this.props.detailsUser(user._id)
               
            }


        } catch (error) {
            if (error === "Network Error") {
                await this.props.history.push('/server-error');
            } else {

            }

        }
    }
    render() {
        const { email, password } = this.state
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))


        return (
            <header>

                <Link to={userInfo && userInfo.isAdmin ? "/admin/dashboard" : "/"}>
                    {/* */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <img src={Logo} className="logoImage" alt="" />
                        <h1 className="logo" style={{ color: '#ff7473', paddingLeft: '20px', textTransform: 'uppercase' }}>Learnnia </h1>
                    </div>

                </Link>
                <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                <nav>
                    <ul>
                        {userInfo && userInfo.isAdmin ? <li>
                            <div className="dropdown">
                                <Link to="/admin/dashboard">
                                    Dashboard <i className="fa fa-caret-down"></i>{' '}
                                </Link>

                                <ul className="dropdown-content" style={{ borderWidth: 2, borderColor: 'rebeccapurple' }}>
                                    <li>
                                        <Link
                                            to={{
                                                pathname: '/',
                                                state: { go: true, } // your data array of objects
                                            }}
                                        >Website
                                        </Link>
                                    </li>


                                </ul>
                            </div>
                        </li> :
                            <li>
                                <Link to={userInfo && userInfo.isAdmin ? "/admin/dashboard" : "/"}>
                                    {userInfo && userInfo.isAdmin ? "Dashboard" : "Home"}
                                </Link>
                            </li>}
                        <li><Link to="/about-us">About </Link></li>
                        <li><Link to="/blogs">Blogs</Link></li>
                        <li><Link to="/forums">Forums</Link></li>
                        <li><Link to="/contact-us">Contact</Link></li>
                        {userInfo && userInfo.cc ?
                            <li>
                                <div className="dropdown">
                                    <Link to="#">
                                        Articles <i className="fa fa-caret-down"></i>{' '}
                                    </Link>

                                    <ul className="dropdown-content" style={{ borderWidth: 2, borderColor: 'rebeccapurple' }}>
                                        <li>
                                            <Link to="/content-creator/my-content">Articles</Link>
                                        </li>
                                        <li onClick={() => this.setState({ showaddNote: true })}>
                                            <Link to="" style={{ color: 'red' }}> Add art</Link>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                            : null}

                        {userInfo ? <li>
                            <div className="dropdown">

                                <Link to="#">
                                    <img src={userInfo.imageUrl} alt="" /> {userInfo.firstname}  {userInfo.surname} <i className="fa fa-caret-down"></i>{' '}
                                </Link>

                                <ul className="dropdown-content" style={{ borderWidth: 2, borderColor: 'rebeccapurple' }}>

                                    <li>
                                        <Link to="/profile"> Profile</Link>
                                    </li>

                                    <li onClick={() => this.signoutHandler()}>
                                        <Link to="/">
                                            Logout
                                        </Link>
                                    </li>

                                </ul>
                            </div>

                        </li> : (
                            <li className="signinLinks" onClick={() => this.setState({ show: true })}>Sign In</li>
                        )}
                        
                    </ul>
                </nav>
                <label htmlFor="nav-toggle" className="nav-toggle-label">
                    <span></span>
                </label>
                {/* <Editor editorState={this.state.editorState} onChange={this.onChange} /> */}
                <Login
                    show={this.state.show}
                    submit={() => this.onSubmit()}
                    handleChange={(e) => this.handleChange(e)}
                    register={() => this.setState({ showRegModal: true, show: false })}
                    email={email}
                    gmaillogin={(response) => this.glogin(response)}
                    error={this.state.error}
                    loading={this.props.loading}
                    errored={this.state.errored}
                    password={password}
                    close={() => this.setState({ show: false })}
                />
                <Addnote show={this.state.showaddNote}
                    data={this.props.types}
                    area={this.props.areas}
                    changeArea={(e) => this.setState({ area: e.target.value })}
                    levels={this.props.levels}
                    stateerror={this.state.stateerror}
                    instituitions={this.props.instituitions}
                    loading={this.props.loadingNote}
                    handleCatChange={(e) => this.handleCatChange(e)}
                    handleareaChange={e => this.handleareaChange(e)}
                    handlevelChange={e => this.handlevelChange(e)}
                    handlefileChange={(e) => this.handlefileChange(e)}
                    other={this.state.other}

                    onChange={(e) => this.onChange(e)}
                    handleinstChange={(e) => this.handleinstChange(e)}
                    errored={this.state.errored}
                    error={this.props.notesErr}
                    submitNote={() => this.submitNote()}
                    handleChange={(e) => this.handleChange(e)}
                    handlelevelChange={(e) => this.setState({ level: e.target.value })}
                    hide={() => this.setState({ showaddNote: false })}
                />
                <Register
                    show={this.state.showRegModal}
                    submit={() => this.onRegister()}
                    handleChange={(e) => this.handleChange(e)}
                    email={email}
                    errored={this.state.errored}
                    error={this.state.error}
                    password={password}
                    loading={this.props.loading}
                    login={() => this.setState({ showRegModal: false, show: true })}
                    close={() => this.setState({ show: false })}
                />
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.userSignin.error,
        loading: state.userSignin.loading,
        user: state.userSignin.userInfo,
        userinfo: state.userDetails.user,
        notesErr: state.notesData.error,
        loadingNote: state.notesData.loading,
        notes: state.notesData.notes,
        types: state.typesData.types,
        levels: state.levelData.levels,
        areas: state.areaData.areas,
        instituitions: state.instituitionData.instituitions
    }

};

export default connect(mapStateToProps, { postnotes, GmailLogin, getareaswithtypes, getareas, getlevelswithtypes, getlevels, getnotes, getinstituitions, getinstituitionswithtypes, gettypes, register, login, signout, detailsUser })(withRouter(nav));
