import React from 'react';
import '../../src/index.css'

export default function Footer() {
  return (
    <div className='footer'>
      &copy; {new Date().getFullYear()} <i className="fa-brands fa-github custom-icon fa-xl"></i>
    </div>
  );
}
