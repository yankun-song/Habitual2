import React from 'react';
import { connect } from 'react-redux';

const Calendar = (props) => {

    const hundred = <div className='square green'></div>
    const sixtySixTo99 = <div className='square yellow-green'></div>
    const thirtyThreeTo65 =  <div className='square beige'></div>
    const zero = <div className="square grey"></div>;

    const currentMonth = [];
    for (let avg of props.calendar) {
        avg = Math.floor(avg * 100);
        if (avg >= 100) {currentMonth.push(hundred);}
        else if (avg >= 60) currentMonth.push(sixtySixTo99);
        else if (avg > 0) currentMonth.push(thirtyThreeTo65);
        else currentMonth.push(zero);
    }


    return (
        <div className='calendar'>
            <div className='squares-wrapper'>
             {currentMonth}
            </div>
        </div>
    );
};

export default Calendar;

// return (
//     <div className='calendar'>
//         <div className='squares-wrapper'>
//             <div className='square green'></div>
//             <div className='square yellow-green'></div>
//             <div className='square green'></div>
//             <div className='square beige'></div>
//             <div className='square yellow-green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square yellow-green'></div>
//             <div className='square yellow-green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square beige'></div>
//             <div className='square beige'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square yellow-green'></div>
//             <div className='square green'></div>
//             <div className='square yellow-green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square green'></div>
//             <div className='square yellow-green'></div>
//             <div className='square green'></div>
//             <div className='square yellow-green'></div>
//             <div className='square green'></div>
//             <div className='square beige'></div>
//             <div className='square green'></div>
//             <div id='label-month'>April '22</div>
//         </div>
//     </div>
// );


    // Fetch calendar's {calendar: [28]} 
    
    // const getCalendarArr = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/feed');
    //         const  data = await response.json();
    //         currentMonth = data.calendar;
    //     } catch(error) {
    //         console.error(error.message)
    //     }
    // }
    


    // const sampleArr = [
    //     100,
    //     100,
    //     100,
    //     100,
    //     100,
    //     100,
    //     90,
    //     100,
    //     100,
    //     100,
    //     100,
    //     10,
    //     100,
    //     100,
    //     100,
    //     70,
    //     100,
    //     100,
    //     100,
    //     50,
    //     30,
    //     100,
    // ]