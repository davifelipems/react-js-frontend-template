import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    margin-bottom: 15px;
    border: 1px solid;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  .error{
    color: #ff3333;
    border: 1px solid #ff3333;
  }
  .sucess{
    color: #0cad2d;
    border: 1px solid #0cad2d;
  }
  input {
    margin-bottom: 15px;
    padding: 0 20px;
  }
  button {
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;