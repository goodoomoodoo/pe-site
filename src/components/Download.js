import React from 'react';

import '../style/Download.css';

class Download extends React.Component
{
    constructor( props )
    {
        super( props );

        this.handleInput = this.handleInput.bind( this );
        this.handleReturn = this.handleReturn.bind( this );
    }

    handleInput( e )
    {
        this.props.setFilename( e.target.value );
    }

    handleReturn()
    {
        this.props.setDownloadWindowFalse();
        this.props.handleSubmit();
        this.props.setFilename( 'new file' );
    }

    render()
    {
        return (
            <div className='Download'>
                <span>File name: </span>
                <input value={this.props.fname} onChange={this.handleInput} />
                <span> .txt </span>
                <button onClick={this.handleReturn}>Continue</button>
            </div>
        );
    }
}

export default Download;