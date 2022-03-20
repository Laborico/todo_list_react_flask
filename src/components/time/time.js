import  React, { useState , useEffect } from 'react'
import moment from 'moment';
import './time.css';
import {Row} from 'react-bootstrap';


export const Time = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 10000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <>  
            <Row>
                <h1 className='hour'> {date.toLocaleTimeString([], {timeStyle: 'short'})}</h1>
                <h2> {moment().format('ddd MMM Do, YYYY')}</h2>
            </Row>
        </>
    )
}

export default Time