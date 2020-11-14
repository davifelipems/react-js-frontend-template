import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Content from '../../common/template/content'

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    render() {
        return (
            <Content title='Home' loading={this.state.loading}>
                Application
            </Content>
        );
    }
}

export default withRouter(App);