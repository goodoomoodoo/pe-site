import React from 'react';

import '../style/Intro.css';

class Intro extends React.Component
{
    render() {
        return (
            <div className='Intro'>
                <div className='Intro-logo'>
                    <h1>Percent Error</h1>
                    <h3>Slack off like you mean it</h3>    
                </div>

                <div className='Intro-about'>
                    <div className='Intro-about-grid'>
                        <div className='Intro-about-grid-item'>
                            <h3><span>✍️</span> Type them in</h3>
                        </div>
                        <div className='Intro-about-grid-item'>
                            <h3><span>📊</span> Upload your excel</h3>
                        </div>
                        <div className='Intro-about-grid-item'>
                            <h3><span>📃</span> Download as text file</h3>
                        </div>
                    </div>
                </div>

                <div className='Intro-join'>
                    <h2>Type in some numbers and experience the convenience of receiving instant answer</h2>
                    <button>Login and Try It Now</button>
                </div>
            </div>
        );
    }
}

export default Intro;