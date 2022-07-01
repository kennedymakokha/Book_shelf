import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import TableLoader from '../../common/tableLoader';
import { getnotes, getusernotes, deletenote, publishnote } from '../../redux/actions/notes'
class Notes extends Component {
    render() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        return (
            <div>
                {this.props.loading ? <TableLoader /> : <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '5px' }}>#</th>
                                <th >Title</th>
                                <th style={{ width: '200px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data !== undefined && this.props.data.map((v, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{v.title}</td>
                                    <td>
                                        {userInfo.cc ? <button
                                            type="button"
                                            className="btn-xs  right"
                                            style={{ marginTop: 10, marginBottom: 10 }}
                                            onClick={() => this.fetchUses('cc')}
                                        >
                                            <i className="fas fa-user-edit"></i>  Edit
                                        </button> : null}
                                        {v.deletedAt === null ? userInfo.isAdmin ? <button
                                            type="button"
                                            className="btn-xs  right"
                                            style={{ marginTop: 10, marginBottom: 10 }}
                                            onClick={() => this.props.publisheNote(v._id)}
                                        >

                                            {!v.published ? "Publish" : "Unpublish"}
                                        </button> : null : null}
                                        {userInfo.isAdmin ? <button
                                            type="button"

                                            className="btn-xs  right"
                                            style={{ marginTop: 10, marginBottom: 10, color: v.deletedAt === null ? "red" : "green" }}
                                            onClick={() => this.props.deleteNote(v._id)}
                                        >
                                            {v.deletedAt === null ? "Delete" : "Restore"}
                                        </button> : null}

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>}
            </div>



        );
    }

}

// export default Notes

const mapStateToProps = (state) => {
    return {
        error: state.typesData.error,
        loading: state.typesData.loading,
        types: state.typesData.types,
        notes: state.notesData.adminNotes,
        levels: state.levelData.levels,
        areas: state.areaData.areas,
        users: state.usersData.users,
        blogs: state.blogsData.blogs,
        blogsErr: state.blogsData.error,
        pager: state.blogsData.pager,
        blogsloading: state.blogsData.loading,
        instituitions: state.instituitionData.instituitions

    }

};

export default connect(mapStateToProps, { deletenote, publishnote, getnotes, getusernotes })(withRouter(Notes));


