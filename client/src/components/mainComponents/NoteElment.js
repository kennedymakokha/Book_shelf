import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/ratting';
import Logo from './../images/pdf.png'
// using ES6 modules
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

// using CommonJS modules
// import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';

const NoteElment = props => {
    const text = props.data.title;
    const count = 20;
    const result = text.slice(0, count) + (text.length > count ? "..." : "");

    return (
        <div className="card" >
            {/* {props.data.file} */}
            <Link to={props.data.published ? `/notes/${props.data.slug}`:'/'}>
                <div className="document-container">

                    <img src={Logo} height="200px"  width="100%" alt="" />
                    {/* <Document
                        renderMode="canvas"
                        file={props.data.file}
                        options={{ workerSrc: "/pdf.worker.js" }}
                        onLoadSuccess={props.onDocumentLoadSuccess}
                    >
                        <Page
                            renderMode="canvas"
                            onContextMenu={(e) => e.preventDefault()}
                            error="You have Reached the end" pageNumber={1} height={100} width={200} >
                            
                        </Page>
                    </Document> */}
                </div>
            </Link>
            <div className="card-body">

                <Link
                    to={{
                        pathname: props.data.published ? `/notes/${props.data.slug}`:'/',
                        state: { id: "props.data.slug", psd: props.data.file } // your data array of objects
                    }}
                >
                    <h2 >{result}</h2>
                </Link>
                {!props.data.published ?<div className="coming-soon">Coming soon</div>:
                <Rating
                    rating={props.data.likes.length}
                    numReviews={props.data.numReviews}
                ></Rating>}
            </div>
        </div>
    );
}


export default NoteElment;