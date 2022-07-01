import React  from 'react';

const Table = async (props) => {

    return (
        <div>
            <button
                type="button"
                className="small primary right"
                style={{ margin: 10 }}
                onClick={props.show}
            >
                Add
            </button>

            <table className="table">
                <thead>
                    <tr>
                        {props.headerColumns.map((d, i) => (
                            <th> {d}</th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {/* {k.map((product) => ( */}

                    {props.columnData.map((v) => (
                        <tr key={props.k.id}>
                            {props.k.map((product) => (
                                <td>{product}</td>))}

                            {/* <td>{k[2].books}</td>  */}
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}


export default Table;