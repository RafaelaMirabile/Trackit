import logo from "../assets/img/logo.png"
import styled from "styled-components"

export default function Logo(){
    return(
        <ImgConatiner>
            <img src={logo} alt ="Logo TrackIt"/>
        </ImgConatiner>
    )
}
const ImgConatiner = styled.div`
    margin: 68px auto 32px;
    height: 180px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width:200px;
        height: 200px;
    }
`
