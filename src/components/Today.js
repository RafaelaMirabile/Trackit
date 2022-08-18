
import dayjs from "dayjs";
import { useContext,useEffect,useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import { CheckmarkSharp } from "react-ionicons";
import { getUserHabitsForTodayPage, habitStatus } from "../service/API";
import "dayjs/locale/pt-br"


export default function Today(){

    const {userToken,setArrTodayUserHabits,arrTodayUserHabits}= useContext(UserContext);
    const currentDate = dayjs().locale('pt-br').format("dddd, D/MM");
    const[loading, setLoading]= useState(false);

    useEffect(()=>{        
        getUserHabitsForTodayPage(userToken).then(({data})=> {           
            setArrTodayUserHabits(data);
            setLoading(true);
        })
        .catch(()=> console.error);
        
    },[userToken, arrTodayUserHabits, setArrTodayUserHabits]);

    
    function concludedHabits(){
        
        function calcPercentage () {
            const progress = arrTodayUserHabits.filter(habit => habit.done).length;
            const totalHabits = arrTodayUserHabits.length;        
            return ((progress/totalHabits) * 100).toFixed(0);
        }
        return(
            <TodayDate>
                <h2>{currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}</h2>
                {loading ?  
                <State>
                    {arrTodayUserHabits.filter(habit => habit.done).length === 0 ?<span>Nenhum hábito concluído ainda</span>  :
                    <p>{calcPercentage()}% dos hábitos concluídos</p>}
                </State>  : 
                <State><ThreeDots color="#FFFFFF" height={20} width={50}/></State>  
                }           
            </TodayDate>
        )
    }

    const topbar = concludedHabits();
    
    return(
            <TodayContainer> 
                {topbar}
                {loading ? <TodayUserHabitsContainer>
                                {arrTodayUserHabits.map((value,index)=> 
                                <HabitStatus 
                                    index={index} 
                                    habitName={value.name}
                                    habitID={value.id}  
                                    currentSequence={value.currentSequence} 
                                    highestSequence={value.highestSequence} 
                                    status={value.done}
                                    loading={loading}
                                />)}
                            </TodayUserHabitsContainer> : 
                            <TodayUserHabitsLoadingContainer>
                                <ThreeDots color="#FFFFFF" height={30} width={60}/>
                            </TodayUserHabitsLoadingContainer>                         
                        }
            </TodayContainer>         
    )
}

function HabitStatus({habitName,currentSequence,highestSequence,status,habitID,loading }){
    
    const{userToken}=useContext(UserContext);

    const [done,setDone]= useState(status);
    const [current, setCurrent]= useState(currentSequence);
    const [record, setRecord]= useState(highestSequence);

    function check(){
        if(current === record){
            setRecord(record + 1);
        }
        setCurrent(current + 1);
    }

    function uncheck(){
        setCurrent(current - 1);
        setRecord(record - 1);
    }
           
    function toggleStatus(habitID){        
        if(!done){
            habitStatus(userToken, habitID,'check');
            setDone(true);
            check();

        } else{
            habitStatus(userToken,habitID,'uncheck');
            setDone(false);
            uncheck();
        }       
    }    
    return(
        <TodayHabitBox>
            <SequenceBox>
                <HabitName>{habitName}</HabitName>
                <Sequence state={done ? true : false}> <Info>Sequência atual: </Info>{current} {current > 1 ? 'dias' : 'dia' }</Sequence>
                <Record state={current === record && record !== 0 ? true : false}><Info>Seu recorde:</Info> {record} {record > 1 ? 'dias' : 'dia'}</Record>
            </SequenceBox>
            <CheckHabit state={done} onClick={()=>toggleStatus(habitID)}>
                <CheckmarkSharp
                    color="#ffffff"
                    height="35px"
                    width="28px"
                />
            </CheckHabit>           
        </TodayHabitBox>       
        )
    }

const TodayHabitBox =styled.div`
margin-bottom: 10px;
display: flex;
justify-content: space-between;
width: 340px;
height: 94px;
background: #FFFFFF;
border-radius: 5px;
padding: 10px;
`
const TodayUserHabitsLoadingContainer = styled.div`
height: 400px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
overflow-y: auto;
border: 2px solid red;
`

const TodayUserHabitsContainer=styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
overflow-y: auto;
border: 2px solid red;
padding-bottom: 120px;
`
const TodayDate=styled.div`
margin-bottom: 8px;
h2{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
}
`
const State =styled.div`
span{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
    margin-top:2px;
}
p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #8FC549;
    margin-top:2px;
}

`
const TodayContainer=styled.div`
margin-top: 70px;
background-color: #E5E5E5;
display: flex;
flex-direction: column;
justify-content: flex-start;
padding: 10px;
height: 100vh;
border: 2px solid blue;
`
const Sequence =styled.p`
font-size: 13px;
 color: ${props => props.state ? '#8fc549' : '#666666'};
`
const Info =styled.span`
 font-size: 13px;
 color: #666666;
`
const Record = styled.p`
font-size: 13px;
 color: ${props => props.state ? '#8fc549' : '#666666'};
`

const HabitName =styled.div`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #666666;
`
const SequenceBox=styled.div`
p{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 12.976px;
line-height: 16px;
color: #666666;
margin-bottom: 2px;
}
`
const CheckHabit= styled.div`
 width: 69px;
 height: 69px;
 background-color: ${props => props.state? '#8fc549' : '#ebebeb'};
 border-radius: 5px;
 display: flex;
 justify-content: center;
 align-items: center;
`