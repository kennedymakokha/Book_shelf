import React, { Component } from 'react';
import Layout from './layout/index'
import NoteElment from './mainComponents/NoteElment';
import Sidebar from './mainComponents/sidebar';
// import Filter from './mainComponents/filter';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getnotes } from './redux/actions/notes'
import { apply, detailsUser } from './redux/actions/users'
import { getinstituitions, getinstituitionswithtypes } from './redux/actions/instituition'
import { getlevelswithtypes, getlevels } from './redux/actions/level'
import { getareaswithtypes, getareas } from './redux/actions/area'
import { gettypes } from './redux/actions/types'
import NoteElmentLoader from './mainComponents/NoteElmentLoader';
import Paginate from './mainComponents/paginate';

class landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            data1: [],
            userInfo: null,
            page: 1,
            limit: 8,
            activeTab: 1,
            pageNumber: 0,
            universities: {
                icon: 'fa fa-graduation-cap',
                title: "Top Institutes",
                elements: []
            },
            topCourses: {
                icon: 'fa fa-bookmark',
                title: "Popular Courses",
                elements: ["Law", "Bussiness and Commerce", "Science and Technology", "Social Science", "Health"]
            }
        }
    }
    applieforcc = async () => {
        try {
            const user = await JSON.parse(localStorage.getItem('userInfo'))
            if (user) {
                await this.props.apply()
                await this.props.detailsUser(user._id)
            } else {
                alert("Login to apply")
            }

        } catch (error) {
            if (error === `TypeError: Cannot destructure property 'token' of '(intermediate value)' as it is null.`) {
                alert("error")
            }

        }
    }
    setType = async (e, name) => {
        const data = { type: e, name: name }

        if (e === "all") {
            await this.props.getlevels()
            await this.props.getareas()
            await this.props.getinstituitions()
            await this.fetchnotedata()

        } else {

            await this.props.getlevelswithtypes(data)
            await this.props.getareaswithtypes(data)
            await this.props.getinstituitionswithtypes(data)
            await this.fetchnotedata(data)

        }
        this.setState({

            universities: {
                icon: 'fa fa-graduation-cap',
                title: "Top Institutes",
                elements: this.props.instituitions
            },
            topCourses: {
                icon: 'fa fa-bookmark',
                title: "Popular Courses",
                elements: this.props.areas
            }
        })


    }
    set = async (e, name) => {
        const data = { type: e, name: name }
        // const pageData = { page: this.state.page, limit: this.state.limit }
        if (e === "all") {
            await this.fetchnotedata()
        } else {
            await this.fetchnotedata(data)

        }

    }

    prev = async () => {
        if (this.state.page >= 1) {
            this.setState(prevState => ({ page: prevState.page - 1 }))

            await this.fetchnotedata()
        }
    }
    page = async (data) => {
        this.setState({ page: data })

        await this.fetchnotedata()
    }
    next = async () => {
        if (this.state.page <= this.props.pager) {
            this.setState(prevState => ({ page: prevState.page + 1 }))

            await this.fetchnotedata()
        }

    }
   

    fetchnotedata = async (data) => {

        try {
            if (data) {
                await this.props.getnotes(this.state.page, this.state.limit, data)

            } else {
                await this.props.getnotes(this.state.page, this.state.limit)

            }
            this.setState({ activeTab: this.state.page })
        } catch (error) {
            alert(JSON.stringify(error.response))
        }
    }
    componentDidMount = async () => {

        try {
            await this.props.gettypes()
            await this.props.getinstituitions()
            await this.props.getlevels()
            await this.props.getareas()
            await this.fetchnotedata()
            
            const user = JSON.parse(localStorage.getItem('userInfo'))

            if (user) {
                const { location } = this.props
                let b = false
                if (location.state && this.props.location.state.go) {
                    b = true
                }


                if (user.isAdmin === true && b !== true) {
                    await this.props.history.push('/admin/dashboard');
                }
                await this.props.detailsUser(`${user._id}`)
            }

            this.setState({

                universities: {
                    icon: 'fa fa-graduation-cap',
                    title: "Top Institutes",
                    elements: this.props.instituitions
                },
                topCourses: {
                    icon: 'fa fa-bookmark',
                    title: "Popular Courses",
                    elements: this.props.areas
                }
            })

        } catch (error) {
            alert(error)
        }

    }
    render() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        // alert(this.props.pager)
        return (
            <Layout>

                {/* <div className="section-title text-center row center">
                <h2 className="row center" style={{textAlign:'center'}}>Latest Notes</h2>
                    <span className="icon"><i className="icon-cog-1"></i></span>
                </div> */}
                {/* <h2 className="row center" style={{ textAlign: 'center' }}>Latest Notes</h2> */}
                <div className="container-fluid">
                    <div className="home-container">
                        <div className="row" >

                            <select
                                style={{ margin: '20px' }}
                                onChange={(e) => this.setType(e.target.value, "type")}
                            >

                                <option>Select a type</option>
                                {this.props.types.map((cat, i) => (
                                    <option value={cat._id} key={i}>{cat.name}</option>
                                ))
                                }
                                <option value="all">all</option>
                            </select>
                            <select
                                style={{ margin: '20px' }}
                                onChange={(e) => this.set(e.target.value, "instituition")}
                            >
                                <option>Select a instituion</option>
                                {this.props.instituitions.map((cat, i) => (
                                    <option value={cat._id} key={i}>{cat.name}</option>
                                ))
                                }
                                <option value="all">all</option>
                            </select>
                            <select
                                style={{ margin: '20px' }}
                                onChange={(e) => this.set(e.target.value, "level")}
                            >
                                <option>Select a Level of study</option>
                                {this.props.levels.map((cat, i) => (
                                    <option value={cat._id} key={i}>{cat.name}</option>
                                ))
                                }
                                <option value="all">all</option>
                            </select>
                            <select
                                style={{ margin: '20px' }}
                                onChange={(e) => this.set(e.target.value, "area")}
                            >
                                <option>Select a Course</option>
                                {this.props.areas.map((cat, i) => (
                                    <option value={cat._id} key={i}>{cat.name}</option>
                                ))
                                }
                                <option value="all">all</option>
                            </select>

                            {userInfo && !userInfo.isAdmin ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {this.props.user ? this.props.user.cc ? <></> :
                                    <button onClick={() => this.applieforcc()} style={{ backgroundColor: this.props.user && this.props.user.applied ? "#87ceeb" : "red", color: 'black' }} className="bt btn-primary">{this.props.user && this.props.user.applied ? "Application for a content creator is pending" : "Become a content creator"}</button>
                                    : null}
                            </div> : null}
                            {/* <Filter data={this.props.types} setData={(e) => this.setType(e.target.value)} title="type" />
                            <Filter data={this.props.instituitions} setData={(e) => this.setCat(e.target.value)} title="instituition" />
                            <Filter data={this.props.levels} setData={(e) => this.setCat(e.target.value)} title="level of study" />
                            <Filter data={this.props.areas} setData={(e) => this.setCat(e.target.value)} title="area of study" /> */}
                            <input onChange={(e) => this.fetchnotedata({ type: e.target.value, name: "word" })}
                                style={{ margin: '20px', width: "100%" }}
                            />

                        </div>
                        <div className="row">
                            <div className="side-bar">
                                <Sidebar data={this.state.universities} loading={this.props.loading} />
                                <Sidebar data={this.state.topCourses} loading={this.props.loading} />
                            </div>
                            <div className="landing-content">
                                <div className="row">
                                    {this.props.loading ? <NoteElmentLoader /> : this.state.data1 !== undefined ? this.props.notes && this.props.notes.length === 0 ? <div className="No-content"><h3 style={{ textAlign: 'center', padding: "auto" }}>No Content for this selection</h3></div> : <>{this.props.notes.map((book, i) => (<NoteElment data={book} page={this.state.pageNumber} key={i} onDocumentLoadSuccess={() => this.onDocumentLoadSuccess()} />))}


                                    </> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pagination center row">
                        <ul>
                            {this.state.page > 1 ? <li ><span onClick={this.state.page > 1 ? () => this.prev() : null}>{this.state.page > 1 ? "Prev" : "Null"}</span></li> : null}
                            <Paginate page={(r) => this.page(r)} pager={this.props.pager} activeTab={this.state.activeTab} />
                            {this.state.page < this.props.pager ? <li ><span onClick={async () => this.next()}>Next</span></li> : null}
                        </ul>
                    </div>
                </div>


            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.notesData.error,
        loading: state.notesData.loading,
        notes: state.notesData.notes,
        pager: state.notesData.pager,
        types: state.typesData.types,
        levels: state.levelData.levels,
        areas: state.areaData.areas,
        user: state.userDetails.user,
        instituitions: state.instituitionData.instituitions,

    }

};

export default connect(mapStateToProps, { detailsUser, apply, getareaswithtypes, getareas, getlevelswithtypes, getlevels, getnotes, getinstituitions, getinstituitionswithtypes, gettypes })(withRouter(landing));

