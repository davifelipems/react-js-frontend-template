import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo192.png";
import { Form, Container } from "./styles";
import api from "../../services/api";
import If from '../../common/operator/if';
import { setUser,isAuthenticated } from "../../services/auth";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: false,
    msg:""
  };

  componentDidMount(){
    
    if(isAuthenticated()){
      this.props.history.push("/app");
    }
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
        this.setState({ msg: "Fill in all fields before proceeding!" ,error:true});
    } else {
      this.setState({ loading: true });
        try {
          await api.post("/auth/sign-up", { name:username, email, password });
          this.setState({ loading: false });
          setUser(username);
          this.setState({ msg: "Successful registration! Redirecting...",error:false});
          setTimeout(() => {
            this.props.history.push("/");
          }, 3000);
        } catch (err) {
          var message = "Unknown error";
          if(err.message){
              message = err.message;
          }
          if(err.response && err.response.data.message){
              message = err.response.data.message;
          }
          
          if(err.response && err.response.data.errors){
              message = err.response.data.errors[0].message;
          }
          this.setState({
            msg:message,error:true
          });
          this.setState({ loading: false });
        }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp} className="box box-solid box-default">
          <If test={this.state.loading} >
            <div className="overlay">
              <i className="fa fa-refresh fa-spin"></i>
            </div>
          </If>
          <img src={Logo} alt="Logo" />
          {this.state.msg && <p className={this.state.error ? 'error' : 'sucess'}>{this.state.msg}</p>}
          <input
            type="text"
            placeholder="User name"
            className="form-control"
            onChange={e => this.setState({ username: e.target.value })}
          />
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
          <button type="submit" className="btn btn-primary btn-flat btn-lg">Sign Up</button>
          <hr />
          <Link to="/">Sign In</Link>
        </Form>
      </Container>
    );
  }
}

export default SignUp;