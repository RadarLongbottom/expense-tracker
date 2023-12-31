import React, { useState } from "react";
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm() {
    const {addExpense, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const [descriptionCount, setDescriptionCount] = useState(0);

    const  {title, amount, date, category, description} = inputState;

    const handleInput = name => e => {
        const value = e.target.value;
        setInputState({ ...inputState, [name]: value });

        if (name === 'description') {
            setDescriptionCount(value.length);
        }

        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '', 
        })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input 
                type='text' 
                value={title}
                name={'title'}
                placeholder="Nazwa Wydatku"
                onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}
                type='text' 
                name={'amount'}
                placeholder="Kwota Wydatku"
                onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker 
                id='date'
                placeholderText="Wprowadź Datę"
                selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                    setInputState({...inputState, date: date})
                }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Wybierz Opcję</option>
                    <option value="Edukacja">Edukacja</option>
                    <option value="Zakupy Spożywcze">Zakupy Spożywcze</option>
                    <option value="Zdrowie">Zdrowie</option>
                    <option value="Subskrypcje">Subskrypcje</option>
                    <option value="Jedzenie">Jedzenie</option>
                    <option value="Ubrania">Ubrania</option>  
                    <option value="Podróże">Podróże</option>
                    <option value="Gry">Gry</option>
                    <option value="Elektronika">Elektronika</option>  
                    <option value="Inne">Inne</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" 
                value={description} 
                placeholder='Wprowadź Opis' 
                id="description" 
                cols="30" 
                rows="4" 
                onChange={handleInput('description')}
                ></textarea>
                <p className="character-count">{`${descriptionCount}/30`}</p>
            </div>

            <div className="submit-btn">
                <Button 
                    name={'Dodaj Wydatek'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
    .character-count {
        margin-top: 0.5rem;
        font-size: 12px;
        color: rgba(34, 34, 96, 0.4);
    }
`;
export default ExpenseForm