import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Content from '../../common/template/content';
import { Link } from 'react-router-dom'

class AccessDined extends Component {

    render() {
        return (
            <Content>
                <div className="card card-default">
                    <div className="card-body">
                        <div className="small-box bg-red">
                            <div className="inner">
                                <h3>Access Dined</h3>
                                <p>Your login may be expired or you may not have permission to access this resource</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-hand-paper-o"></i>
                            </div>
                            <div className="small-box-footer">
                                <div className="btn-group-horizontal">
                                <Link to='/signout' className='btn btn-social pull-center btn-flat btn-danger'>
                                        <i className="fa fa-user"></i> Login
                                </Link>
                                <Link to='/app' className='btn btn-social btn-flat btn-danger'>
                                        <i className="fa fa-home"></i>
                                        Back to home page
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}

export default withRouter(AccessDined);