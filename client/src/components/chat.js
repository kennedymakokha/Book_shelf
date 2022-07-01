import React, { Component } from 'react';
import './css/chat.css'
import Layout from './layout/index'
import { postquestion, getquestions, reply } from './redux/actions/questions';
import moment from 'moment'
import Paginate from './mainComponents/paginate'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'
import AddReply from './mainComponents/addsmsReply';
const socket = io("http://159.65.122.139:9080");
class chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            more: true,
            moreans: false,
            question: '',
            unauth: false,
            reply: false,
            body: '',
            page: 1,
            limit: 5,
            activeTab: 1,
            currentUser: '',
            onlineguys: [],
            smsCount: 0

        }
        this.myRef = React.createRef();
        this.myreply = React.createRef();

    }
    addConversation = async (data) => {

        const data1 = { senderId: this.state.sender, recieverId: data._id }
        await this.props.CreateConversation(data1)
        await this.props.getAuthUserConversations(`${data._id}`)

        // this.setState({ conversationId: data._id, currentUser: data._id })

    }

    fetchdata = async () => {
        await this.props.getquestions(this.state.page, this.state.limit)
        this.setState({ activeTab: this.state.page })
    }
    fetchMessages = async (data) => {

        // alert(JSON.stringify(data.members))
        const userInfo = await JSON.parse(localStorage.getItem('userInfo'));

        await this.props.getConversationMessages(`${data._id}`)
        for (let i = 0; i < data.members.length; i++) {
            if (data.members[i]._id !== userInfo._id) {
                this.setState({ conversationId: data._id, currentUser: data.members[i]._id })
            }
        }
    }
    submit = async () => {
        try {
            const userInfo = await JSON.parse(localStorage.getItem('userInfo'))
            if (userInfo) {
                const { question } = this.state
                socket.emit("sent-question", question)
                await this.props.postquestion({ question: this.state.question })
                this.setState({ question: '' })
                await this.fetchdata()
                const node = this.myRef.current;
                if (node) {
                    node.scrollIntoView({ block: "start", behavior: "smooth" })
                }
            } else {
                this.setState({ unauth: true })
                const node = this.myreply.current;
                if (node) {
                    node.scrollIntoView({ block: "end", behavior: "smooth" })
                }
            }

        } catch (error) {

        }


    }
    submitReply = async () => {
        const userInfo = await JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo) {
            await this.props.reply({ body: this.state.body, question: this.state.question })
            const { question } = this.state
            socket.emit("sent-question", question)
            this.setState({ question: '', reply: false })
            await this.fetchdata()
        } else {
            this.setState({ unauth: true, reply: false })
            const node = this.myreply.current;
            if (node) {
                node.scrollIntoView({ block: "end", behavior: "smooth" })
            }
        }
    }
    onsubmit = async () => {
        const userInfo = await JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo) {
            const { text, sender, conversationId, currentUser } = this.state
            const data = { text, conversationId, sender }
            await this.props.PostMessage(data)
            this.setState({ text: '' })
            await this.props.getConversationMessages(`${conversationId}`)
        } else {
            this.setState({ unauth: true })
        }

        const node = this.myreply.current;
        if (node) {
            node.scrollIntoView()
        }
        // const sentData = { senderId: sender, recieverId: currentUser, conversationId, text }
        // socket.emit("sentMessage", sentData)

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    replytoquiz = (question) => {
        this.setState({ question: question, reply: true })
    }
    prev = async () => {
        if (this.state.page >= 1) {
            this.setState(prevState => ({ page: prevState.page - 1 }))
            await this.fetchdata()
            const node = this.myRef.current;
            if (node) {
                node.scrollIntoView({ block: "start", behavior: "smooth" })
            }

        }
    }
    page = async (data) => {
        this.setState({ page: data })
        await this.fetchdata()
        const node = this.myRef.current;
        if (node) {
            node.scrollIntoView({ block: "start", behavior: "smooth" })
        }

    }
    next = async () => {
        if (this.state.page <= this.props.pager || this.state.page <= this.props.adminblogs) {
            this.setState(prevState => ({ page: prevState.page + 1 }))
            await this.fetchdata()
            const node = this.myRef.current;
            if (node) {
                node.scrollIntoView({ block: "start", behavior: "smooth" })
            }

        }

    }

    componentDidMount = async () => {
        await this.fetchdata()

        socket.on('recieve-question', async (sms) => {
            await this.fetchdata()
        })
        socket.on("getMessage", async (data) => {
            if (data !== undefined) {

            } else {
                return
            }
        })
    }
    componentDidUpdate = async (prevProps, prevState) => {



    }
    render() {
        console.log(JSON.stringify(this.props.questions))
        return (
            <Layout>
                <div className="row">

                    <div className="side-bar" style={{ border: "red", borderRightWidth: "1px", minHeight: '10vh' }}>
                        Frequently asked questions

                        <ul style={{ padding: "20px" }}>
                            {this.props.questions.map((q, i) => (
                                <li key={i}>{q.question}</li>
                            ))}
                        </ul>
                        {/* <Sidebar  data={this.state.questions} loading={true} /> */}
                        {/* <Sidebar data={this.state.levels} loading={this.props.loading} /> */}
                    </div>
                    <div className="landing-content" ref={this.myRef} style={{ marginTop: '10px' }}>
                        {this.state.unauth ? <div ref={this.myreply} className="row center loginNow">Kindly Login  first !!!</div> : null}

                        {this.props.questions.map((q, i) => (
                            <div className="row" style={{ paddingTop: '20px', paddingBottom: '30px', }} key={i}>
                                <div className="question_tag">Q{i + 1}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h4 >{q.question}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className='mesgHeader'>
                                            <span> <i class="fa fa-clock-o fa-spin" style={{ color: '#87CEEB' }} aria-hidden="true"></i> {moment(q.createdAt).fromNow()}</span>
                                            <span>
                                                <i className="fa fa-user" style={{ color: '#87CEEB' }}></i> {q.createdBy && q.createdBy.surname}
                                            </span>
                                            {/* <span>{q.replies.length}</span> */}
                                            <span style={{ padding: "0px", margin: '0px', height: '10px' }} className="right" onClick={() => this.replytoquiz(q._id)}>
                                                <i class="fa fa-reply" style={{ color: '#87CEEB' }} aria-hidden="true"></i> {q.replies.length} reply</span>

                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                                {this.state.moreans ? q.replies.slice(0, 5).map : q.replies.map((q, i) => (
                                                    <div style={{ paddingLeft: '20px', paddingTop: '0px', }} key={i}>
                                                        {/* <div className="ans_tag">A{i + 1}</div> */}
                                                        <p style={{ fontStyle: 'italic' }}> <i style={{ color: '#87CEEB' }} class="fa fa-check" aria-hidden="true"></i> {q.body}</p>
                                                        <div className="right"> <i class="fa fa-clock-o fa-spin" style={{ color: '#0f2a5f' }} aria-hidden="true"></i> {moment(q.createdAt).fromNow()} | <i style={{ color: '#0f2a5f' }} className="fa fa-user"></i> {q.name}</div>

                                                    </div>

                                                ))}
                                                {/* {q.replies.length > 1 ? <div className="center" onClick={() => this.setState((prevState) => ({ moreans: !prevState.moreans }))}>{this.state.moreans ? "Less" : "More"}</div> : null} */}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                        {this.state.more ? <div className="row center MoreButton" onClick={() => this.setState({ more: false })}>More</div> :
                            <div className="pagination" style={{ margin: "30px" }}>
                                <ul>
                                    {this.state.page > 1 ? <li ><span onClick={this.state.page > 1 ? () => this.prev() : null}>{this.state.page > 1 ? "Prev" : "Null"}</span></li> : null}
                                    <Paginate page={(r) => this.page(r)} pager={this.props.pager} activeTab={this.state.activeTab} />
                                    {this.state.page < this.props.pager ? <li ><span onClick={async () => this.next()}>Next</span></li> : null}
                                </ul>
                            </div>}
                        <div>
                            <textarea name="question" value={this.state.question} onChange={e => this.handleChange(e)} />
                            <button className="right" onClick={() => this.submit()}>Submit</button>
                        </div>
                    </div>
                </div>

                <AddReply hide={() => this.setState({ reply: false })} show={this.state.reply} handleChange={(e) => this.handleChange(e)} submit={() => this.submitReply()} />
            </Layout >

        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.quizData.questions,
        loading: state.quizData.loading,
        error: state.convoData.error,
        pager: state.quizData.pager,
        messages: state.messageData.messages
    }

};

export default connect(mapStateToProps, { postquestion, getquestions, reply })(chat);

