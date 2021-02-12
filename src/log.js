import React from "react";
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';

import './log.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'mdbreact/dist/css/mdb.css';


const FormPage = () => {
  return (
      
    <MDBContainer>
    {!this.state.success || this.state.error ? (

      <MDBRow>
        <MDBCol md='6'>
          <MDBCard
            className='card-image'
            style={{
              backgroundImage:
                'url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)',
              width: '28rem'
            }}
          >
            <div className='.form-dark text-white rgba-stylish-strong py-5 px-5 z-depth-4 '>
              <div className='text-center '>
                <h3 className='white-text mb-5 mt-4 font-weight-bold '>
                  <strong>SIGN </strong>
                  <a href='#!' className='.form-dark green-text font-weight-bold '>
                    <strong> IN</strong>
                  </a>
                </h3>
              </div>
              <MDBInput
              className = "inptxt"
                label='Your email'
                data-test="username" value={this.state.username} onChange={this.handleUserChange}
                group
                type='text'
                validate
                labelClass='white-text '
              />
              <MDBInput className = " pass"
                label='Your password'
                group
                type='password'

                data-test="password" value={this.state.password} onChange={this.handlePassChange}
                validate
                labelClass='white-text'

              />
        
              <MDBRow className='d-flex align-items-center mb-4 '>
                <div className='text-center mb-3 col-md-12'>
                  <button
                    rounded
                    type='button'
                    className="signInButton"
                    onClick={this.handleclick} data-test="submit"
                  >
                    Sign in
                  </button>
                </div>
              </MDBRow>
              <MDBCol md='12'>
                <p className='font-small white-text d-flex justify-content-end'>
                  Have an account?
                  <a href='#!' className='green-text ml-1 font-weight-bold'>
                    Log in
                  </a>
                </p>
              </MDBCol>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      ) : (<BrowserRouter>
        {/* <label onClick={() => this.passData(this.state.username, this.state.password)} value="click here">/*/}
        <Route path="/" render={() => <div><App /></div>}/>

    </BrowserRouter>

        )}
    </MDBContainer>
  );
};

export default FormPage;