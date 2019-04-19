import React from 'react';
import firebase from '@firebase/app';
import FileSaver from 'file-saver';
import '@firebase/functions';

import Upload from './Upload';
import Download from './Download';
import Footer from './Footer';

import '../style/Main.css';

class Main extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            setArray: [ 1 ],
            setCount: 1,
            reading: [ '' ],
            calc: [ '' ],
            uploadButtonText: 'Upload',
            downloadButtonText: 'Download',
            isUploaded: false,
            showUploadWindow: false,
            showDownloadWindow: false,
            fname: 'new file'
        };

        this.handleAddSet = this.handleAddSet.bind( this );
        this.handleInput = this.handleInput.bind( this );
        this.handleDownload = this.handleDownload.bind( this );
        this.handleUpload = this.handleUpload.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.displayErrorMessage = this.displayErrorMessage.bind( this );
        this.setStateCalc = this.setStateCalc.bind( this );
        this.setStateReading = this.setStateReading.bind( this );
        this.setStateCounts = this.setStateCounts.bind( this );
        this.setStateUploaded = this.setStateUploaded.bind( this );
        this.setFilename = this.setFilename.bind( this );
        this.setDownloadWindowFalse = this.setDownloadWindowFalse.bind( this );
    }

    componentDidUpdate()
    {
        let objul = document.getElementById( 'Main-grid-ptr' );
        objul.scrollTo( { top: objul.scrollHeight } );

        if ( this.state.isUploaded )
        {
            for ( let i in this.state.reading )
            {
                let error = this.displayErrorMessage( this.state.reading[ i ], this.state.calc[ i ] );
                document.getElementById( `error${i}` ).innerHTML = error;
            }
        }
    }

    handleAddSet()
    {
        let rtemp = this.state.reading;
        let ctemp = this.state.calc;

        rtemp.push( '' );
        ctemp.push( '' );

        this.setState({
            setArray: [ ...this.state.setArray, this.state.setCount + 1 ],
            setCount: this.state.setCount + 1,
            reading: rtemp,
            calc: ctemp
        });
    }

    handleInput( e )
    {
        e.preventDefault();

        let temp = this.state[ e.target.name ];

        // change the value of the index to entered value
        temp[ e.target.id ] = e.target.value;

        this.setState({
            [ e.target.name ]: temp
        });

        let currRead = this.state.reading[ e.target.id ];
        let currCalc = this.state.calc[ e.target.id ];

        document.getElementById(`error${e.target.id}`).innerHTML = this.displayErrorMessage( currRead, currCalc );
    }

    handleUpload()
    {
        this.setState({
            showUploadWindow: !this.state.showUploadWindow,
            uploadButtonText: this.state.showUploadWindow ? 'Upload' : 'Close',
            showDownloadWindow: false,
            downloadButtonText: 'Download'
        });
    }

    handleDownload()
    {
        this.setState({ 
            showDownloadWindow: !this.state.showDownloadWindow, 
            downloadButtonText: this.state.showDownloadWindow ? 'Download' : 'Cancel',
            showUploadWindow: false,
            uploadButtonText: 'Upload'
        });
    }

    // Triggered in Download Comp
    handleSubmit()
    {
        //firebase.functions().httpsCallable('helloWorld')().then( res => { console.log( res ) } );
        let blob = new Blob( ["hello"], { type: 'text/plain' } );
        let url = URL.createObjectURL( blob );
        FileSaver.saveAs( url, this.state.fname );
    }

    // Created to be passed into child comp.: reading setter
    setStateReading( arrayRead )
    {
        this.setState({ reading: arrayRead });
    }

    // Created to be passed into child comp. Upload
    setStateCalc( arrayCalc )
    {
        this.setState({ calc: arrayCalc });
    }

    // Created to be passed into child comp. Upload
    setStateCounts( size )
    {
        let arr = [ 1 ];

        for( let i = 2; i <= size; i+=1 )
            arr.push( i );

        this.setState({
            setCount: size,
            setArray: arr
        });
    }

    // Created to be passed into child comp. Upload
    setStateUploaded()
    {
        this.setState({ isUploaded: true });
    }

    // Created to be passed into child comp. Download
    setFilename( text )
    {
        this.setState({ fname: text });
    }

    setDownloadWindowFalse()
    {
        this.setState({ showDownloadWindow: false, downloadButtonText: 'Download' } );
    }

    /**
     * Check if the string is convertible to double/float
     * @param { String } param
     * @return { Boolean } true if the string format is double/float, else false 
     */
    isDouble( param )
    {
        return param !== '' && param.match( /^\d+(?:\.\d*){0,1}$/ );
    }

    /**
     * Calculate the percent error with to calculated and recorded values
     * @param { Double } rhs Theoretical/Calc value
     * @param { Double } lhs Reading/Recorded value
     * @return { Double } percent error in percentage
     */
    calcPercentError( rhs, lhs )
    {
        let diff = rhs > lhs ? rhs - lhs : lhs - rhs;
        return diff / rhs * 100.0;
    }

    /**
     * TODO: write description
     * @param { String } read 
     * @param { String } calc 
     */
    displayErrorMessage( read, calc )
    {
        let error = '';

        if ( this.isDouble( read ) && this.isDouble( calc ) ) {
            error = this.calcPercentError( parseFloat( calc ), parseFloat( read ) );
            error = error.toFixed( 3 ) + '%';
        }

        return error;
    }

    render()
    {
        return (
            <div className='Main'>
                <div className='Main-container'>
                    <h3>Set</h3>
                    <h3>Reading/Record</h3>
                    <h3>Theoretical/Calculated</h3>
                    <h3>Error</h3>
                    <ul className='Main-grid' id="Main-grid-ptr">
                    { this.state.setArray.map( ( count, index ) => 
                        <li className='Main-set' key={index} >
                            <h3>Set {count}</h3>
                            <input id={index} name='reading' value={this.state.reading[ index ]} onChange={this.handleInput} />
                            <input id={index} name='calc' value={this.state.calc[ index ]} onChange={this.handleInput} />
                            <h3 id={`error${index}`} className='Main-error'></h3>
                        </li>
                     ) }
                    </ul>
                </div>

                <div className='Main-action'>
                    <button className='Main-button' onClick={ this.handleAddSet }>Add</button>
                    <button className='Main-button' onClick={ this.handleUpload }>{this.state.uploadButtonText}</button>
                    <button className='Main-button' onClick={ this.handleDownload }>{this.state.downloadButtonText}</button>
                </div>

                { this.state.showUploadWindow && <Upload setCalcValue={this.setStateCalc} 
                    setReadingValue={this.setStateReading}
                    setCountValue={this.setStateCounts} setUploaded={this.setStateUploaded}/> }

                { this.state.showDownloadWindow && <Download fname={this.state.fname} setFilename={this.setFilename} 
                    setDownloadWindowFalse={this.setDownloadWindowFalse} handleSubmit={this.handleSubmit}/> }

                <Footer />
            </div>
        );
    }
}

export default Main;