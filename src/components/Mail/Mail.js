// Изучите файл `/cypress/integration/homework.spec.js`, чтобы понять,
// какие классы должен использовать компонент.

import React, { PureComponent } from 'react';
import styles from './Mail.module.css';

class Mail extends PureComponent{    


    render(){    
        const {...mail} = this.props 
        return(
            <div className={styles.container}>
            {
                mail.from ? (
                <p className='t-mail-from'>
                    From: 
                    <b>{` ${mail.from}`}</b>
                </p>
                ) : ( 
                <p className='t-mail-to'>
                    To: 
                    <b>{` ${mail.to}`}</b>
                </p>
            )}                
                <p className='t-mail-body'>{mail.body}</p>
            </div>
        )
    }

}

export default Mail;
