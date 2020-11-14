import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo192.png";
import api from "../../services/api";
import { login,isAuthenticated,setEmail } from "../../services/auth";
import If from '../../common/operator/if';

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  componentDidMount(){
    if(isAuthenticated()){
      this.props.history.push("/app");
    }
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "fill in all fields before proceeding" });
    } else {
      this.setState({ loading: true });
      try {
        const response = await api.post("/login", { email, password });
        login(response.headers.authorization.replace("Bearer", ""));
        this.setState({ loading: false ,error:false});
        setEmail(email);
        this.props.history.push("/app");
      } catch (err) {
        var message = "Unknown error";
        if (err.response && err.response.data.message) {
          message = err.response.data.message;
        };
        this.setState({
          error: message
        });
        this.setState({ loading: false });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn} className="box box-solid box-default">
          <If test={this.state.loading} >
            <div className="overlay">
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          </If>
          <img src={Logo} alt="Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="e-mail"
            className="form-control"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit" className="btn btn-primary btn-flat btn-lg">Sign In</button>
          <hr />
          <Link to="/signup">Sign Up</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);