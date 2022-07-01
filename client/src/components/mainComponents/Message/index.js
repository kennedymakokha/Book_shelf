
import './message.css'
import { format} from 'timeago.js';


export default function Message({ own, data }) {

    return (
        <div className={own ? "message own" : "message"}>

            <div className="messageTop">

                {/* <img alt="" className="messageImage" src='https://www.tnstate.edu/agriculture/resumes/images/SHaile.jpg' /> */}
                <p className="messageText">{data.text}</p>
            </div>
            <div className="messageBottom"> {format(data.createdAt)}</div>

        </div >
    );

}

