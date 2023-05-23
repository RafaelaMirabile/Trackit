import { useContext } from "react"
import styled from "styled-components";
import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext"
import { deleteUserHabit } from "../../service/API";

export default function UserHabits({habit,deleteHabitFromList,index}){
    
    const {userToken} = useContext(UserContext);
    
    const weekdaysList = ["D", "S", "T", "Q", "Q", "S", "S"];
    
    function deleteHabit(){
        Swal.fire({
            title: 'Deseja excluir o hábito?',
            text: 'Não será possível reverter esta ação',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
          }).then ((result)=>{
            if(result.isConfirmed){
                deleteUserHabit(userToken,habit.id);
                deleteHabitFromList(index);
            }
          })
    }
    
    function showWeekDays(){
        return(
            <>
            {weekdaysList.map((weekday, index) => {
            const isSelected = habit.days.some((day) => day === index);
            return (<Weekday key={index} isSelected={isSelected}>{weekday}</Weekday>)
        })}
            </>
        )
    }
    
    const weekdays= showWeekDays();
    
    return(
        <CreatedHabit>
            <HabitName>
               <p>{habit.name}</p>
               <ion-icon name="trash-outline" onClick={deleteHabit}></ion-icon>
            </HabitName>
            <WeekdaysContainer>{weekdays}</WeekdaysContainer>
        </CreatedHabit>
    )
}

const HabitName = styled.div`
display: flex;
justify-content: space-between;
width:340px;
padding: 10px;
`
const CreatedHabit= styled.div`
margin-bottom: 10px;
width: 340px;
height: 91px;
background: #FFFFFF;
border-radius: 5px;
p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
}

ion-icon{
width: 20px;
height: 20px;
position: absolute;
z-index: 1;
}
`
const WeekdaysContainer= styled.div`
display: flex;
margin-left: 10px;
`

const Weekday = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.isSelected ? '#ffffff' : '#dbdbdb'};
    border-radius: 5px;
    margin-right: 10px;
    height: 30px;
    width: 30px;
    background-color: ${props => props.isSelected ? "#DBDBDB" : "#FFFFFF"};
    font-family: 'Lexend Deca', sans-serif;
    color: ${props => props.isSelected ? "#FFFFFF" : "#DBDBDB"};
`;