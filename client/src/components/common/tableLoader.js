import React from 'react';
import ContentLoader from 'react-content-loader'
import _ from 'lodash'
const Rows = () => {
    let card = [];
   
    _.times(15, (i) => {
        card.push(
            <tr>
                <td>
                    <ContentLoader viewBox="0 0 310 250">
                        <rect x="0" y="0" rx="5" ry="5" width="310" height="250" />
                    </ContentLoader>
                </td>
                <td> <ContentLoader viewBox="0 0 310 20">
                    <rect x="0" y="0" rx="5" ry="5" width="310" height="20" />
                </ContentLoader>
                </td>
                <td>
                    <ContentLoader viewBox="0 0 310 20">
                        <rect x="0" y="0" rx="5" ry="5" width="310" height="20" />
                    </ContentLoader>
                </td>
                <td>
                    <ContentLoader viewBox="0 0 310 20">
                        <rect x="0" y="0" rx="5" ry="5" width="310" height="20" />
                    </ContentLoader>
                </td>
                <td>
                    <ContentLoader viewBox="0 0 310 20">
                        <rect x="0" y="0" rx="5" ry="5" width="310" height="20" />
                    </ContentLoader>
                </td>
            </tr>
        );
    });


    return card

}
function TableLoader(props) {

    return (
        <table className="table">
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
                <Rows />
            </tbody>
        </table>
    );
}

export default TableLoader;