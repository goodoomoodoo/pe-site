import React from 'react';

import '../style/Footer.css';

class Footer extends React.Component
{
    render()
    {
        return (
            <div className='Footer'>
                <a href='https:/github.com/goodoomoodoo'>@goodoomoodoo</a> <a href='https://github.com/goodoomoodoo/percent-error'>Code on github</a> 2019 Calculator
            </div>
        );
    }
}

export default Footer;