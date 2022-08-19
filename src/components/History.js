import styled from "styled-components"

export default function HistoryPage(){
    return(
        <HistoryContainer>
            <Title>
                <p>Histórico</p>
            </Title>
            <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle>
        </HistoryContainer>       
    )
}

const HistoryContainer = styled.div`
padding: 10px;
background-color: #E5E5E5;
margin-top: 70px;
background-color: #E5E5E5;
height: 100vh;
`
const Title =styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 26px;
width: 100%;

p{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;
}
`
const Subtitle= styled.span`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #666666
`

