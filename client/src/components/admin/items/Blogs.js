import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import TableLoader from '../../common/tableLoader';
import Paginate from '../../mainComponents/paginate';
import { getblogs, postblog, deleteblog, publishblog } from '../../redux/actions/blogs'
class Types extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            limit: 5,
            activeTab: 1,
        }
    }
prev = async () => {
        if (this.state.page >= 1) {
            this.setState(prevState => ({ page: prevState.page - 1 }))
            await this.fetchdata()
            // await this.fetchnotedata()
        }
    }
    page = async (data) => {
        this.setState({ page: data })
        await this.fetchdata()
        // await this.fetchnotedata()
    }
    next = async () => {
        if (this.state.page <= this.props.pager || this.state.page <= this.props.adminblogs) {
            this.setState(prevState => ({ page: prevState.page + 1 }))
            await this.fetchdata()
            await this.fetchnotedata()
        }

    }
    publisheBlog = async (data) => {
        await this.props.publishblog(data.id)
        await this.props.getblogs(data.page, data.limit)

    }
    deleteBlog = async (data) => {
        await this.props.deleteblog(`${data.id}`)
        await this.props.getblogs(data.page, data.limit)

    }
    
    fetchdata = async () => {

        await this.props.getblogs(this.state.page, this.state.limit)

        this.setState({ activeTab: this.state.page })
    }
    componentDidMount = async () => {

        await this.fetchdata()
       
    }
    render() {

        return (
            <div>
                
                {!this.props.blogsloading ? <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '5px' }}>#</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>File</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props.blogs && this.props.blogs.map((v, i) => (
                            <tr key={i} style={{ textDecoration: v.deletedAt === null ? "none" : "line-through" }}>
                                <td>{i + 1}</td>
                                <td>{v.title}</td>
                                <td>{v.body}</td>
                                <td><img src={v.file} alt='' height="20px" /></td>

                                <td>
                                    {v.deletedAt === null ? <button
                                        type="button"
                                        className="btn-xs right"
                                        style={{ marginTop: 10, marginBottom: 10 }}
                                        onClick={() => this.publisheBlog({ id: v._id, page: this.props.page, limit: this.props.limit })}
                                    >
                                        <i className="fas fa-user-edit"></i> {v.published ? "Unpublish" : "Publish"}
                                    </button> : null}
                                    <button
                                        type="button"
                                        className="btn-xs right"
                                        style={{ marginTop: 10, marginBottom: 10, color: v.deletedAt === null ? "red" : "green" }}
                                        onClick={() => this.deleteBlog({ id: v._id, page: this.props.page, limit: this.props.limit })}
                                    >
                                        <i className="fa fa-delete"></i> {v.deletedAt === null ? "Delete" : "Restore"}
                                    </button>

                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>:<TableLoader/>}

                {this.props.loading ? null : <div className="pagination">
                    <ul>
                        {this.state.page > 1 ? <li ><span onClick={this.state.page > 1 ? () => this.prev() : null}>{this.state.page > 1 ? "Prev" : "Null"}</span></li> : null}
                        <Paginate page={(r) => this.page(r)} pager={this.props.pager} activeTab={this.state.activeTab} />
                        {this.state.page < this.props.pager ? <li ><span onClick={async () => this.next()}>Next</span></li> : null}
                    </ul>
                </div>}
            </div >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.typesData.error,

        blogs: state.blogsData.adminblogs,
        blogsErr: state.blogsData.error,
        pager: state.blogsData.pager,
        blogsloading: state.blogsData.loading,


    }

};

export default connect(mapStateToProps, { deleteblog, publishblog, postblog, getblogs })(withRouter(Types));


