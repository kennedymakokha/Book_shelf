import React, { Component } from 'react';
import AddType from '../mainComponents/addtype';
// import Table from '../mainComponents/table';
import Layout from "../layout/index"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { fetchUsers, approvecc } from '../redux/actions/users'
import { getareas, postarea, getareaswithtypes } from '../redux/actions/area'
import { gettypes, posttype } from '../redux/actions/types'
import { getinstituitions, postinsti } from '../redux/actions/instituition'
import { getlevels, getlevelswithtypes, postlevel } from '../redux/actions/level'
import { getnotes, getusernotes, deletenote, publishnote } from '../redux/actions/notes'
import { getblogs, postblog } from '../redux/actions/blogs'
import Sidebar from '../mainComponents/sidebar';
import Addblog from '../mainComponents/addblog';
import Paginate from '../mainComponents/paginate';
import Types from './items/types';
import Level from './items/level';
import Courses from './items/courses';
import Ccreaators from './items/Ccreaators';
import Notes from './items/notes';
import Blogs from './items/Blogs';
import TableLoader from '../common/tableLoader';
class Type extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: '',
            show: false,
            addblog: false,
            type: '',
            level: '',
            title: '',
            body: "",
            fileErr:'',
            file: '',
            name: "",
            page: 1,
            limit: 5,
            activeTab: 1,

            errored: false,
            levels: {
                icon: 'fa fa-graduation-cap',
                title: "Top Institutes",
                elements: []
            },
            types: {
                icon: 'fa fa-graduation-cap',
                title: "Top Institutes",
                elements: []
            },
            data: {
                headerColumns: [],
                columnData: []

            }

        }
    }


    prev = async () => {
        if (this.state.page >= 1) {
            this.setState(prevState => ({ page: prevState.page - 1 }))
            await this.fetchdata()
            await this.fetchnotedata()
        }
    }
    page = async (data) => {
        this.setState({ page: data })
        await this.fetchdata()
        await this.fetchnotedata()
    }
    next = async () => {
        if (this.state.page <= this.props.pager || this.state.page <= this.props.adminblogs) {
            this.setState(prevState => ({ page: prevState.page + 1 }))
            await this.fetchdata()
            await this.fetchnotedata()
        }

    }
    handleiChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errored: false
        })

    }
    handleChange = (e) => {
        this.setState({
            name: e,
            errored: false
        })
    }
    handleSubmit = async () => {
        try {
            const data = { name: this.state.name }
            await this.props.posttype(data)
            await this.props.gettypes()
            this.setState({ show: false })
        } catch (error) {
            this.setState({ show: false, errored: true })
        }
    }
    handleSubmitins = async () => {
        try {
            const data = { name: this.state.name, type: this.state.type }
            await this.props.postinsti(data)
            await this.props.getinstituitions()
            this.setState({ show: false })
        } catch (error) {
            this.setState({ show: false, errored: true })
        }
    }
    handleSubmitLevel = async () => {
        try {
            const data = { name: this.state.name, type: this.state.type }
            await this.props.postlevel(data)
            await this.props.getlevels()
            this.setState({ show: false })
        } catch (error) {
            this.setState({ show: false, errored: true })
        }
    }


    clicktype = async (id) => {
        const data = { type: id }
        await this.props.getlevelswithtypes(data)
        await this.props.getareaswithtypes(data)

        this.setState({
            levels: {
                icon: 'fa fa-graduation-cap',
                title: "Levels of study",
                elements: this.props.levels
            },
        })

    }

    handleCatChange = async (e) => {
        const data = { type: e.target.value }
        await this.props.getlevelswithtypes(data)
        this.setState({ type: e.target.value })

    }
    handlesubitCourse = async () => {
        try {
            const data = { name: this.state.name, level: this.state.level, type: this.state.type }
            await this.props.postarea(data)
            this.setState({ show: false })
            await this.props.getareas()
        } catch (error) {
            console.log(error)
        }
        // await this.props.getlevels()


    }

    handlefileChange = (e) => {
        // console.log()
        if (e[0].size > 1010616){
            this.setState({
                fileErr:'File size allowed 1.3Mb'
            })
        }
            this.setState({
                file: e[0],
                errored: false
            })
    }
    submitBlog = async () => {
        try {
            const data = {
                title: this.state.title,
                body: this.state.body,
                file: this.state.file,
            }
            await this.props.postblog(data)
            await this.props.getblogs(this.state.page, this.state.limit)
            this.setState({ addblog: false })
        } catch (error) {
            alert(error)
            this.setState({ errored: true })
        }

    }
    fetchdata = async () => {
        await this.props.getblogs(this.state.page, this.state.limit)

        this.setState({ activeTab: this.state.page })
    }
    fetchnotedata = async () => {
        await this.props.getnotes(this.state.page, this.state.limit)

        this.setState({ activeTab: this.state.page })
    }

    publisheNote = async (id) => {
        await this.props.publishnote(id)
        await this.fetchnotedata()

    }
    deleteNote = async (id) => {
        await this.props.deletenote(id)
        await this.fetchnotedata()

    }
    componentDidMount = async () => {

        const category = this.props.match.params.category;
        // alert(category)

        await this.props.getinstituitions()

        // await this.props.fetchUsers('all')
        // await this.props.gettypes()
        // await this.fetchdata()

        // await this.fetchnotedata()

        // } else {
        //     await this.props.getusernotes()
        // }

        this.setState({
            route: category,
            levels: {
                icon: 'fa fa-graduation-cap',
                title: "Levels of Education",
                elements: this.props.levels
            },
            types: {
                icon: 'fa fa-graduation-cap',
                title: "Levels of study",
                elements: this.props.types
            }
        })
    }
    render() {
        const category = this.props.match.params.category;
        return (
            <Layout>
                <div className="row">
                    <div className="side-bar">
                        <Sidebar click={(id) => this.clicktype(id)} data={this.state.types} loading={this.props.loading} />
                        <Sidebar data={this.state.levels} loading={this.props.loading} />
                    </div>
                    <div className="landing-content" style={{ marginTop: '10px' }}>
                        <div className="row"></div>
                        <div>

                            {category === "content-creators" || category === "notes" || category === "content-creator/my-content" ? null : <button
                                type="button"
                                className="small primary right"
                                style={{ margin: 10 }}
                                onClick={category === "blogs" ? () => this.setState({ addblog: true }) : () => this.setState({ show: true })}
                            >
                                Add
                            </button>
                            }
                            {category === "notes" ? <>
                                <Notes
                                    page={this.state.page}
                                    limit={this.state.limit}
                                    data={this.props.notes}
                                    publisheNote={(i) => this.publisheNote(i)}
                                    deleteNote={(i) => this.deleteNote(i)}
                                />
                                {this.props.loading ? null : <div className="pagination">
                                    <ul>
                                        {this.state.page > 1 ? <li ><span onClick={this.state.page > 1 ? () => this.prev() : null}>{this.state.page > 1 ? "Prev" : "Null"}</span></li> : null}
                                        <Paginate page={(r) => this.page(r)} pager={this.props.notepager} activeTab={this.state.activeTab} />
                                        {this.state.page < this.props.pager ? <li ><span onClick={async () => this.next()}>Next</span></li> : null}
                                    </ul>
                                </div>}
                            </>
                                : category === "courses" ?
                                    <Courses />
                                    : category === "content-creators" ?
                                        <Ccreaators /> :
                                        category === "blogs" ?
                                            <>
                                                <Blogs page={this.state.page} limit={this.state.limit} />
                                            </> :
                                            category === "types" ?
                                                <Types /> : category === "instituitions" || category === "level" ?
                                                    this.props.Typesloading || this.props.instituitionsLoading ? <TableLoader /> : <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '5px' }}>#</th>
                                                                <th>Name</th>
                                                                <th>Category</th>
                                                            </tr>
                                                        </thead>
                                                        {category === "level" ? <Level data={this.props.levels} /> : <Level data={this.props.instituitions} />}
                                                    </table> : null
                            }
                        </div>
                    </div>
                </div>
                <Addblog
                    show={this.state.addblog}
                    hide={() => this.setState({ addblog: false })}
                    handlefileChange={e => this.handlefileChange(e.target.files)}
                    submitBlog={() => this.submitBlog()}
                    error={this.props.blogsErr}
                    fileErr={this.state.fileErr}
                    handleChange={(e) => this.handleiChange(e)}
                    loading={this.props.blogsloading}
                    errored={this.state.errored}
                />
                <AddType
                    data={this.props.types}
                    levels={this.props.levels}
                    submitlevel={() => this.handleSubmitLevel()}
                    handleCatChange={(e) => this.handleCatChange(e)}
                    submitins={() => this.handleSubmitins()}
                    category={category}
                    errored={this.state.errored}
                    error={this.props.error}
                    submit={() => this.handleSubmit()}
                    submitCourse={() => this.handlesubitCourse()}
                    handleChange={(e) => this.handleChange(e.target.value)}
                    handlelevelChange={(e) => this.setState({ level: e.target.value })}
                    show={this.state.show}
                    hide={() => this.setState({ show: false })} />

            </Layout >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.typesData.error,
        loading: state.notesData.loading,
        types: state.typesData.types,
        Typesloading: state.levelData.loading,
        // notes: state.notesData.notes,
        notes: state.notesData.adminNotes,
        notepager: state.notesData.adminpager,
        levels: state.levelData.levels,
        areas: state.areaData.areas,
        users: state.usersData.users,
        blogs: state.blogsData.adminblogs,
        blogsErr: state.blogsData.error,
        pager: state.blogsData.adminpager,
        blogsloading: state.blogsData.loading,
        instituitions: state.instituitionData.instituitions,
        instituitionsLoading: state.instituitionData.loading

    }

};

export default connect(mapStateToProps, { deletenote, publishnote, getareas, postblog, postarea, getblogs, getnotes, getusernotes, getareaswithtypes, fetchUsers, getlevelswithtypes, approvecc, getlevels, postlevel, posttype, gettypes, getinstituitions, postinsti })(withRouter(Type));


