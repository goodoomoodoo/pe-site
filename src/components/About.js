import React from 'react';

import '../style/About.css';

class About extends React.Component
{
    render()
    {
        return (
            <div className='About'>
                <h1>Procrastination</h1>
                <h3>... is the world of efficient students who need their work done fast.</h3>
                <h1>Mission Statement</h1>
                <h3>I am here to help student to finish their work with minimum effort. Why work hard when you don't need to?</h3>
                <h1>About this site</h1>
                <h3>
                    For those who don't understand what percent error is, it is a percent difference between recorded, or measured,
                    value and theoretical, or calculated, value. It is an extreme common data required on STEM lab reports, and I 
                    know it can be extremely tedious for those who don't know how to use excel. Even if you do, it would be easier 
                    for you to upload it here, and select values through user interface. Well... you probably don't need and don't
                    want to use this if you have a small data set, and if you can't tell whether you have a big or small data set, 
                    you probably don't need this site. So... Cheers
                </h3>
            </div>
        );
    }
}

export default About;