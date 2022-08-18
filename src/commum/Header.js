import { useContext } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"
import UserContext from "../contexts/UserContext"

export default function Header(){
    
    const {userProfilePicture} = useContext(UserContext);  
    
    return(
        <HeaderContainer>
            <Content>
                <AppName to="/habitos">TrackIt</AppName>
                <ProfilePicture>
                    <img src={userProfilePicture} alt="Foto de perfil do usuário" />
                </ProfilePicture>
            </Content>
        </HeaderContainer>
    )
}

const HeaderContainer =styled.header`
width: 100%;
left: 0px;
top: 0px;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
position: fixed;
height: 70px;
`
const Content = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 100%;
    max-width: 600px;
`
const AppName = styled(Link)`
    font-family: 'Playball';
    font-size: 38px;
    color: #FFFFFF;
    cursor: pointer;
`

const ProfilePicture = styled.div `
    border-radius: 98px;
    height: 50px;
    max-width: 50px;

    img {
        border-radius: 98px;
        cursor: pointer;
    }
`
