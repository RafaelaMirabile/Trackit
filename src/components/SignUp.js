import { useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { postSignUp } from "../service/API";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function SignUp(){
    
    const navigate = useNavigate();

    const [isInputDisable, setIsInputDisable] = useState(false);
    const[email, setUserEmail]= useState("");
    const[password, setUserPassword]= useState("");
    const[name, setUserName]= useState("");
    const[image, setUserProfilePic]= useState("");

    function userRegistration(e){
        e.preventDefault();
        setIsInputDisable(true);
        
        const body = {
            email,
            name,
            image,
            password
        }

        postSignUp(body)
        .then(()=>{
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'O usuário foi cadastrado',
              })
              navigate("/");
        })
        .catch(()=> {
            Swal.fire({
                icon: 'error',
                title: 'Cadastro Inválido',
                text: 'Houve algum erro durante o cadastro :( Confira se os dados estão preenchidos corretamente.',
          })
            setIsInputDisable(false);
            setUserEmail('');
            setUserName('');
            setUserPassword('');
            setUserProfilePic('');
        })
    }
    
    return (
        <SignUpConatainer>
            <Forms onSubmit={userRegistration}>
                <input  disabled = {isInputDisable ? "true" : "false"} 
                placeholder="email" type="text" required value={email} onChange={e => setUserEmail(e.target.value)}></input>
                <input disabled = {isInputDisable ? "true" : "false"} 
                placeholder="senha" type="text" required value={password} onChange={e => setUserPassword(e.target.value)}></input>
                <input disabled = {isInputDisable ? "true" : "false"} 
                placeholder="nome" type="text" required value={name} onChange={e => setUserName(e.target.value)}></input>
                <input disabled = {isInputDisable ? "true" : "false"} 
                placeholder="foto" type="text" required value={image} onChange={e => setUserProfilePic(e.target.value)}></input>
                {isInputDisable ?<button><ThreeDots color="#FFFFFF" height={20} width={50}/></button> : <button type="submit">Enviar</button> }               
            </Forms>
            <LinkToLoginPage to ="/">Já tem uma conta? Faça login!</LinkToLoginPage>
        </SignUpConatainer>        
    )
}
const LinkToLoginPage = styled(Link)`
font-family: 'Lexend Deca', sans-serif;
font-size: 14px;
text-decoration: underline;
color: #52B6FF;
`
const SignUpConatainer = styled.div`
margin: 0 auto;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Forms =styled.form`
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

