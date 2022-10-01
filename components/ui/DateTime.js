import React, {Fragment} from 'react';

const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

const today = new Date();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const DateTime = () =>{
    return(
        <Fragment>
            <p>{date}</p>
            <p>{time}</p>
        </Fragment>
    )
}

export default DateTime;