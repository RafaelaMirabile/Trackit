import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext";
import Day from "./Day";
import { getUserHabits, sendUserHabit } from "../../service/API";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import UserHabits from "./UserHabits";

export default function Habits(){

    const {userToken}= useContext(UserContext);
    
    const [createHabitBox, setCreateHabitBox]= useState(false);
    const[habitName, setHabitName]= useState("");
    const [selectedDay, setSelectedDay] = useState([]);
    const [arrUserHabits, setArrUserHabits]= useState([]);
    const [loading, setLoading]= useState(true);
    const [loadingHabits, setLoadingHabits]= useState(true);
      
    const weekdays =[
    {day: 'D',dayID: 0,isSelected : false},
    {day: 'S',dayID: 1,isSelected : false},
    {day: 'T',dayID: 2,isSelected : false},
    {day: 'Q',dayID: 3,isSelected : false},
    {day: 'Q',dayID: 4,isSelected : false},
    {day: 'S',dayID: 5,isSelected : false},
    {day: 'S',dayID: 6,isSelected : false}]
    
    useEffect(()=>{
        
        setLoadingHabits(false);
        
        getUserHabits(userToken).then(({data})=>{
            setArrUserHabits(data);
            setLoading(true);
            setLoadingHabits(true);
        })
    },[])   
    
    function sendUserHabitToAPI(e){
        e.preventDefault();
        setLoading(false);

       const body ={
            name: habitName,
            days : selectedDay
        }

        sendUserHabit(body,userToken).then(({data})=> {
            addUserHabit(data);
            setLoading(true);
            setHabitName("");
            setSelectedDay("");
            console.log(selectedDay);

        })
        .catch(()=>{
            setLoading(true);
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Preencha todos os campos corretamente',
            })
            setHabitName("");
            setSelectedDay("");
            console.log(selectedDay);
        })
    }

    function addUserHabit(data){
        setArrUserHabits([...arrUserHabits,data]);
    }
    
    function createHabitInput(){
        return(
            <Box>
                <Input required type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}></Input>
                <Days>
                    {weekdays.map((weekday, index) => <Day selectedDay={selectedDay} 
                    setSelectedDay={setSelectedDay} weekday={weekday} key={index} />)}         
                </Days>
            </Box>
        )
    }

    function userHabitsList(){
        if(arrUserHabits === null){
            return <></>
         } else{
             return (arrUserHabits.map((habit,index)=> <UserHabits habit={habit} key={habit.id} index={index} deleteHabitFromList={deleteHabitFromList}/> ))
         }
    }

    function deleteHabitFromList(position){
        setArrUserHabits([...arrUserHabits].filter((habit,index)=> position !== index));
    }

    const inputFild = createHabitInput();
    const userHabits = userHabitsList();
   
    return(
        <HabitsContainer>
            <PageHeader>
                <h2>Meus hábitos</h2>
                <AddHabit onClick={()=> setCreateHabitBox(!createHabitBox) }>{createHabitBox ? "-" : "+"}</AddHabit>
            </PageHeader>
            <CreatingHabit>
                {createHabitBox ? 
                    <HabitBox >
                        {inputFild}
                        <Actions>
                            <Cancelar onClick={()=>setCreateHabitBox(false)}>Cancelar</Cancelar>
                            {loading ? <Salvar onClick={sendUserHabitToAPI}>Salvar</Salvar> : <Salvar><ThreeDots color="#FFFFFF" height={20} width={50}/></Salvar> }
                        </Actions>
                    </HabitBox> : ""}
            </CreatingHabit>
            {loadingHabits ? 
            <CreatedHabits>
                {userHabits}
                {arrUserHabits.length === 0 ? <Warning>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Warning> : ''}           
            </CreatedHabits> 
            : 
            <CreatedHabits>
                <ThreeDots color="#FFFFFF" height={20} width={50}/>
            </CreatedHabits> 
            }
        </HabitsContainer>
    )
}

const Warning = styled.p `
    font-family: 'Lexend Deca', sans-serif;
    margin-top: 30px;
    font-size: 18px;
    color: #666666;
`

const CreatedHabits =styled.div`
border:2px solid pink;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const HabitsContainer = styled.div`
margin-top: 73px;
border: 2px solid blue;
height: 100vh;
padding: 10px;
background-color: #E5E5E5;
`
const PageHeader= styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 16px;
width: 100%;
h2{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
}
`
const AddHabit = styled.button`
width: 40px;
height: 35px;
background: #52B6FF;
border-radius: 4.63636px;
border: none;
display: flex;
justify-content: center;
align-items: center;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 26.976px;
line-height: 34px;
color: #FFFFFF;
`
const CreatingHabit = styled.form`
margin-bottom: 20px;
background-color: #FFFFFF;
border-radius: 5px;
border:  2px solid green;
`
const HabitBox = styled.div`
margin-bottom: 20px;
background-color: #FFFFFF;
border-radius: 5px;
border: 2px solid red;
`
const Box = styled.div`
display: flex;
flex-direction: column;
`
const Input =styled.input`
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
margin-bottom: 10px;
`
const Days=styled.div`
display: flex;
`
const Actions=styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`

const Salvar=styled.button`
width: 84px;
height: 35px;
background: #52B6FF;
border-radius: 4.63636px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
color: #FFFFFF;
display: flex;
justify-content: center;
align-items: center;
border: none;
margin-top: 8px;
`

const Cancelar=styled.span`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
text-align: center;
color: #52B6FF;
margin-right:14px;
`