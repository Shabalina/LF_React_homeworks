import React, { Fragment, PureComponent } from 'react';
import SectionTitle from '../SectionTitle';
import './Layout.css';

class Layout extends PureComponent {

  renderHeader(HeaderChild) {
  //  const {HeaderChild} = this.props;
    return (
      <header className="header">
        <SectionTitle className={"header__title"}>Header</SectionTitle>
        <div className="header__content">
          <HeaderChild/>
        </div>
      </header>
      )
  }
  
  renderFooter(FooterChild) {      
  //  const {FooterChild} = this.props;
    return (
      <footer className="footer">
          <SectionTitle className={"header__title"}>Footer</SectionTitle>
          <FooterChild/> 
      </footer>
    )
  }
  
  render() {
    const {children, header, footer} = this.props;
      return (
        <React.Fragment>          
          {header ? this.renderHeader(header) : null}        
          <main className={`main ${header ? 'main--with-header' : ''} ${
              footer ? 'main--with-footer' : ''
            }`}>
              <SectionTitle className={"main__title"}>Main</SectionTitle>
              {children}
          </main> 
          {footer ? this.renderFooter(footer) : null}   
        </React.Fragment>
    )
  }  
}

export default Layout;
