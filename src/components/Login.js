import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { postLogin } from "../service/API";
import UserContext from "../contexts/UserContext";
import Swal from "sweetalert2";

export default function Login(){

    const navigate = useNavigate();

    const {setUserToken,setUserProfilePicture} = useContext(UserContext);
    
    const[email, setUserEmail]= useState("");
    const[password, setUserPassword]= useState("");
    const[isInputDisable, setIsInputDisable] = useState(false);

    function loginRequest(e){
        e.preventDefault();
        setIsInputDisable(true);
        const body ={
            email,
            password
        }

        postLogin(body).then(({data})=>{
            const {image,token} = data;
            setUserProfilePicture(image);
            setUserToken(token);
            setUserEmail('');
            setUserPassword('');
            navigate("/hoje");

        })
        .catch(()=>{
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Usuário e/ou senha incorretos!',
            })
            setIsInputDisable(false);
            setUserEmail('');
            setUserPassword('');
        })
    }
      
    return(
        <LoginContainer>
              <Forms onSubmit={loginRequest}>
                <input disabe= {isInputDisable ? "true" : "false"} 
                type = "text" required placeholder="email" value={email} onChange={e => setUserEmail(e.target.value)}></input>
                <input disabe= {isInputDisable ? "true" : "false"}
                type="password" required placeholder="senha" value={password} onChange={e => setUserPassword(e.target.value)}></input>
                {isInputDisable ? <button type="submit"><ThreeDots color="#FFFFFF" height={20} width={50}/></button> :
                <button type="submit">Entrar</button> }                           
              </Forms>
              <LinkToSignUp to="/cadastro"> Não tem uma conta? Cadastre-se!</LinkToSignUp>
        </LoginContainer>                
    )
}
const LoginContainer = styled.div`
margin: 0 auto;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const LinkToSignUp = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    text-decoration: underline;
    color: #52B6FF;
`
const Forms = styled.form`
display: flex;
flex-direction: column;
margin-bottom: 16px;

input{
    margin-bottom: 14px;
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
}
button{
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}
`