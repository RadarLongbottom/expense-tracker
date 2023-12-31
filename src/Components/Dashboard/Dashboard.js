import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        const fetchData = async () => {
            await getIncomes();
            await getExpenses();
        };
    
        fetchData();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Panel Główny</h1>
                <div className="labels">
                    <h2><span>Wydatki</span></h2>
                    <h2><span>Przychody</span></h2>
                </div>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Suma Przychodów</h2>
                                <p>
                                    {totalIncome().toFixed(2)} zł
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Suma Wydatków</h2>
                                <p>
                                    {totalExpenses().toFixed(2)} zł
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Stan Konta</h2>
                                <p>
                                    {totalBalance().toFixed(2)} zł
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Przychody</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {Math.min(...incomes.map(item => item.amount))} zł
                            </p>
                            <p>
                                {Math.max(...incomes.map(item => item.amount))} zł
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Wydatki</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {Math.min(...expenses.map(item => item.amount))} zł
                            </p>
                            <p>
                                {Math.max(...expenses.map(item => item.amount))} zł
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    
.labels {
    display: grid;
    grid-template-columns: repeat(3, 0fr);
    justify-content: space-between;
    gap: 10px;  // Dostosuj wartość gap według potrzeb
    padding: 10px 0;

    h2 {
        margin-right: 25px;
        margin-bottom: 0;
    }

    span {
        font-weight: bold;
        margin-right: 10px;
    }
}
        .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 2.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 3.8rem;
                    }
                }
            }
        }
        

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard