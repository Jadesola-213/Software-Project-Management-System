import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    document.title = 'PMT';
  }, []);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <nav className='top'>
        <h2>PMT</h2>
        <div>
          <Button color='inherit' href='/login'>
            Login
          </Button>
          <Button variant='contained' href='/register'>
            Register
          </Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <h2>An easy-to-use, one-stop tool for effectively managing projects</h2>
        <h1>PMT</h1>
        
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Register
          </Button>
        </div>
      </div>
      <div className='landing-bottom'>
        <h2>Features Include:</h2>
        <h3>Schedu</h3>
        
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Register
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
