import React, { Component } from 'react';
import Layout from './layout/index'
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { connect } from 'react-redux'
import Avatar from './images/pdf.png'
import { withRouter } from 'react-router-dom';
import { getnote, likenote, } from './redux/actions/notes'
import { unsubscribe, subscribe, check } from './redux/actions/subscription'

import ContentLoader from 'react-content-loader'
const K = (props) => {
    const { title, value } = props;
    return (< div >
        <h5><span style={{ fontWeight: 'bold', fontSize: '15px' }}>{title}: </span>{value} </h5>
        <hr style={{ margin: '0px' }} />
    </div >)

}

class bookdetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: {},
            liked: false,
            show: false,
            subsribeState: null,
            numPages: null,
            filepath: '',
            noteId: '',
            pageNumber: 1,
            loading: true,
            likes: 0
        }
    }

    addPage = async () => {

        this.setState((prevState) => ({ pageNumber: prevState.pageNumber + 1 }))

    }
    subScibeNow = async () => {
        const fcm = localStorage.getItem('fcm_token')
        const data = {
            topic: "books",
            fcm_token: `${fcm}`
        }
        if (this.props.subscriber === null) {
            await this.props.subscribe(data)
            const state = await this.props.check(data)
            this.setState({ subsribeState: state })

        } else {
            await this.props.unsubscribe(data)
            const state = await this.props.check(data)
            this.setState({ subsribeState: state })

        }

    }
    subPage = () => {

        this.setState((prevState) => ({ pageNumber: prevState.pageNumber - 1 }))
    }
    onDocumentLoadSuccess = () => {

        this.setState((prevState) => ({ pageNumber: prevState.pageNumber + 1, loading: false }))
    }
    like = async (id) => {

        await this.props.likenote(id)

    }


    componentDidMount = async () => {
        const noteId = this.props.match.params.id;

        // const subsribeState = await subsribe("books")
        // const fcm = localStorage.getItem('fcm_token')




        // await this.props.check({
        //     topic: "books",
        //     fcm_token: `${fcm}`
        // })

        // console.log(this.props.location.state.psd)
        // const { likes } = this.props.note
        this.setState({ noteId, subsribeState: "subsribeState" })
        try {
            await this.props.getnote(noteId)
        } catch (error) {
            await this.props.history.push('/');
        }

    }

    render() {
        const { note } = this.props
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const { type, level, instituition, area, likes } = note
        return (
            <Layout>
                <div className="container-fluid">
                    {/* <div className="center " >
                        <span style={{ flexDirection: 'row', display: 'flex' }} onClick={() => this.subScibeNow()} >
                            {this.props.subLoader ? <i className="fa fa-spinner fa-spin smallcircle center  icons-primary"></i> : <i className={this.props.subscriber !== null ? "fa fa-bell-slash smallcircle center  icons-primary" : "fa fa-bell smallcircle center icons-primary"} ></i>}  {this.props.subscriber !== null ? `Unsubscribe from our Notification` : `Subscribe to our Notification`}
                        </span>
                    </div> */}
                    <div className="home-container">

                        <div className="row">
                            <div className="side-bar">
                                <div className="bookdetailContainer">
                                    <div className="ImageContainer">
                                        <img src={Avatar} alt="" className="Image" />
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <K title="Title" value={this.props.note.title} />
                                        <K title="Type" value={type && type.name} />
                                        <K title="Instituition" value={instituition && instituition.name} />
                                        <K title="Level" value={level && level.name} />
                                        <K title="Course" value={area && area.name} />
                                        {/* <h5><span style={{ fontWeight: 'bold', fontSize: '15px' }}>Type: </span>{type && type.name} </h5> */}
                                        <div style={{ flexDirection: 'row', display: 'flex', marginTop: "5px" }}>
                                            {userInfo && likes && likes.includes(userInfo._id) ? <i onClick={() => this.like(this.state.noteId)} className="fa fa-thumbs-up smallcircle center  icons-secondary"></i> : <i onClick={() => this.like(this.state.noteId)} className="fa fa-thumbs-down smallcircle center  icons-danger"></i>}
                                            {likes && likes.length} Likes
                                            {/* {this.props.loading ? <i className="fa fa-spinner fa-spin smallcircle center  icons-primary"></i> : <i onClick={() => this.props.likenote(this.state.noteId)} className="fa fa-thumbs-up smallcircle center  icons-primary" ></i>} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="landing-content">
                                <div className="row">
                                    <div className="book-detail-container">
                                        <h3>Preface</h3>
                                        <p>
                                            {note.desc}
                                            
                                        </p>
                                        <button className="right ">
                                                <a style={{color:"black"}} href={note.file}>Download</a> 
                                            </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="container-fluid">
                    <div className="center " >
                        <span style={{ flexDirection: 'row', display: 'flex' }} onClick={() => this.subScibeNow()} >
                            {this.props.subLoader ? <i className="fa fa-spinner fa-spin smallcircle center  icons-primary"></i> : <i className={this.props.subscriber !== null ? "fa fa-bell-slash smallcircle center  icons-primary" : "fa fa-bell smallcircle center icons-primary"} ></i>}  {this.props.subscriber !== null ? `Unsubscribe from our Notification` : `Subscribe to our Notification`}
                        </span>
                    </div>
                    <div className="row pdf-container">

                        {this.props.loading ? <ContentLoader viewBox="0 0 380 480">
                            <rect x="0" y="0" rx="5" ry="5" width="354" height="480" />
                        </ContentLoader> :
                            
                            // <Document
                            //     file={this.props.note ? this.props.note.file : NoPdf}
                            //     options={{ workerSrc: "/pdf.worker.js" }}
                            //     onLoadSuccess={() => this.onDocumentLoadSuccess()}

                            // >
                            //     <Page
                            //         renderMode="canvas"
                            //         onContextMenu={(e) => e.preventDefault()}
                            //         className="detailPdf"
                            //         error="You have Reached the end" pageNumber={this.state.pageNumber} height={400} width={1000} />
                            // </Document>
                        }
                    </div>
                    {this.props.note ? <div style={{ backgroundColor: 'grey', paddingTop: 10, paddingLeft: "12%", paddingRight: "15%", display: 'flex', paddingBottom: 20, justifyContent: 'space-between' }}>
                        <button className="primary" onClick={() => this.subPage()}>

                            {props.loading ? <i className="fa fa-spinner fa-spin"></i> : null}  
                            Previous Page
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="success circle" onClick={() => this.addPage()}>
                                <i className="fa fa-thumbs-up"></i>
                            </button>

                            <button className="danger circle" onClick={() => this.props.likenote(this.state.noteId)}>
                                <i className="fa fa-thumbs-down"></i>
                            </button>
                            <span style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>{this.props.note.likes ? this.props.note.likes : 0}</span>
                        </div>
                        <button className="primary" onClick={() => this.addPage()}>

                         {props.loading ? <i className="fa fa-spinner fa-spin"></i> : null}  
                            Next Page
                        </button>
                    </div> : null}
                </div>
                <NoticationToast show={this.state.show}
                    hide={() => this.setState({ show: false })}
                /> */}
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.notesData.error,
        loading: state.notesData.loading,
        note: state.notesData.note,
        subLoader: state.subscriptionsData.loading,
        subscriber: state.subscriptionsData.subscriber
    }

};

export default connect(mapStateToProps, { getnote, likenote, check, unsubscribe, subscribe })(withRouter(bookdetail));

