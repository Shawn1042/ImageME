import React from 'react'
import { Link } from 'react-router-dom';

function Features() {
  return (
    <>
    <Link to="/app">
        <nav className='nav-for-features'>
            <h2>Go <span>back</span></h2>
        </nav>
        </Link>

        <section className='section-for-features'>
    <div className="top">
        <h1>Features Coming Soon to Image<span style={{color: "crimson"}}>Me</span></h1>
    </div>
    <div className="right">
            <ul>
        <li>- Support for resizing ASCII canvases</li>
        <li>- Enhanced image resizing capabilities</li>
        <li>- Improved quality of saved photos</li>
        <li>- Functionality to convert images to base64 strings</li>
        <li>- Functionality to convert base64 strings back to images</li>
        </ul>

    </div>
</section>
    </>
  )
}

export default Features