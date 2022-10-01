import * as React from 'react';
import johny from '../image/JohnSin.jpg';
import classes from './About.module.css';

const About = () => {
    return(
        <div className ={classes.flexContainer}>
                <div className={classes.flexbox}> 
                    <img className={classes.flexbox}  src = {johny}/>
                </div>
                <div className={classes.flexbox}>
                <h1 >我們是誰</h1>
                <p>
                            xxx 補習介紹平台由本地大學生創立。我們認為現時大部分補習介紹平台的中介費過高
                            (介乎首星期至三星期的全數學費) ，並且質素參差。因此我們創立了只收首堂中介費的補習介紹平台，
                            從而吸引更多高質導師加入我們平台。
                            xxx的宗旨為提供專業 、可靠而且性比價最高的補習介紹服務給家長/學生及導師。</p>
                </div>
        </div>
    )
    }
export default About;