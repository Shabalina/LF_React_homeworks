// Изучите файл `/cypress/integration/homework.spec.js`, чтобы понять,
// какие классы должен использовать компонент.

import React, { PureComponent } from 'react';
import { Link,Route} from 'react-router-dom';
import styles from './MailList.module.css';

class MailList extends PureComponent{    


    render(){    
        const {mailData, mailClass, path} = this.props 
        return(
            <div className={`${styles.container} ${mailClass}`}>
            {mailData.map(({ id, body }) => (
                <Link
                    key={id} 
                    className={styles.link}
                    to={`${path}/${id}`}
                >
                    {[`${body.substring(0, 47)}`, '...'].join('')}
                </Link>
            ))}
            </div>
        )
    }

}

export default MailList;