// Реализуйте компонент OutboxList
// Он должен показывать список писем на отправку.
// Используйте HOC withData из `/context/Data` чтобы получить данные.

// Этот компонент должен использовать MailList для отображения данных.

import React, { Component } from 'react';
import { withData } from '../../context/Data';
import MailList from '../MailList';

class OutboxList extends Component{


    render(){    
        const {
            match: {path},
            data 
        } = this.props 
        return(
            <MailList 
                mailData={data.outbox} 
                mailClass={"t-outbox-list"} 
                path={path}
            />
        )
    }

}

export default withData(OutboxList);
