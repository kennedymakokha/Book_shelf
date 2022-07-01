import React, { Component } from 'react';
import Sidebar from '../../mainComponents/sidebar';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { fetchUsers, approvecc } from './../../redux/actions/users'
import { getareas, postarea, getareaswithtypes } from './../../redux/actions/area'
import { gettypes, posttype } from './../../redux/actions/types'
import { getinstituitions, postinsti } from './../../redux/actions/instituition'
import { getlevels, getlevelswithtypes, postlevel } from './../../redux/actions/level'
import { getnotes, getusernotes } from './../../redux/actions/notes'
import Layout from '../../layout';
class notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    componentDidMount = async () => {
        await this.props.getinstituitions()
        await this.props.gettypes()
        await this.props.getusernotes()
        this.setState({
           
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
        return (
            <Layout>
                <>
                    <div className="row">
                        <div className="side-bar">
                            <Sidebar click={(id) => this.clicktype(id)} data={this.state.types} />
                            <Sidebar data={this.state.levels} />
                        </div>
                        <div className="landing-content" style={{ marginTop: '50px' }}>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5px' }}>#</th>
                                            <th >Title</th>
                                            <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.notes && this.props.notes.map((v, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{v.title}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn-xs  right"
                                                        style={{ marginTop: 10, marginBottom: 10 }}
                                                        onClick={() => this.fetchUses('cc')}
                                                    >
                                                        <i className="fas fa-user-edit"></i>  Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.typesData.error,
        loading: state.typesData.loading,
        types: state.typesData.types,
        notes: state.notesData.notes,
        levels: state.levelData.levels,
        areas: state.areaData.areas,
        users: state.usersData.users,
        instituitions: state.instituitionData.instituitions

    }

};

export default connect(mapStateToProps, { getareas, postarea, getnotes, getusernotes, getareaswithtypes, fetchUsers, getlevelswithtypes, approvecc, getlevels, postlevel, posttype, gettypes, getinstituitions, postinsti })(withRouter(notes));
