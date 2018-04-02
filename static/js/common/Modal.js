import React from 'react'
const Modal = (props) => {
    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                {props.title}
            </button>

            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">{props.title}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            {props.children}
                        </div>

                        <div className="modal-footer">

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};
export default Modal;

