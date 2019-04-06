import React from 'react';
import { ExcelRenderer } from 'react-excel-renderer';

import '../style/Upload.css'

class Upload extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            cols: undefined,
            rows: undefined,
            imported: false,
            read: 'select',
            calc: 'select',
            importedList: [],
            selectedColRead: undefined,
            selectedColCalc: undefined,
            isSelected: false
        }

        this.handleFile = this.handleFile.bind( this );
        this.handleListChange = this.handleListChange.bind( this );
        this.handleUpload = this.handleUpload.bind( this );
    }

    handleFile( e )
    {
        e.preventDefault();

        console.log( e.target.files );

        let file = e.target.files[0];

        ExcelRenderer( file, ( err, res ) => {
            if( err )
                console.log( err )
            else
            {
                this.setState({
                    cols: res.cols,
                    rows: res.rows,
                    imported: true
                })
            }
        })
    }

    /**
     * Take the selected value and set as the state value
     * @param {event} e the element event from select
     */
    handleListChange( e )
    {
        e.preventDefault();

        if ( e.target.name === 'select' )
        {
            this.setState({
                [e.target.name]: e.target.name,
                [ `selectedCol${e.target.name}`]: undefined
            });
        }    
        else
        {
            this.setState({ [e.target.name]: e.target.value });
        }

        // disable the selected value in complement list
        let list = document.getElementsByClassName( e.target.name === "Read" ? "Calc" : "Read" );

        for( let i in list )
        {
            if ( list[ i ].value === e.target.value ) 
            {
                list[ i ].disabled = true;
                this.setState({ [ `selectedCol${e.target.name}` ]: i })
            }
            else if ( list[ i ].disabled )
            {
                list[ i ].disabled = false;
            }
        }
    }

    /**
     * Once clicked, excel rows gets iterated and entered into the array. Then, it is return to Main comp.
     */
    handleUpload()
    {

        let arrCalc = [];
        let arrReading = [];

        if ( this.state.selectedColCalc !== undefined && this.state.selectedColRead !== undefined )
        {
            console.log( this.state.rows );

            for ( let i = 1; i < this.state.rows.length; i += 1 )
            {
                for ( let n = 0; n < this.state.rows[ i ].length ; n += 1 )
                {
                    if ( n == this.state.selectedColCalc )
                        arrCalc.push( this.state.rows[ i ][ n ].toString() );
                    
                    if ( n == this.state.selectedColRead )
                        arrReading.push( this.state.rows[ i ][ n ].toString() );
                }
            }
        }

        console.log( arrCalc );
        console.log( arrReading );
        this.props.setCountValue( arrCalc.length );
        this.props.setCalcValue( arrCalc );
        this.props.setReadingValue( arrReading ); 
        this.props.setUploaded();       
    }

    render()
    {
        return (
            <div className='Upload'>
                <div className='Upload-window'>
                    <input type='file' accept='.cvs, application/vnd.ms-excel, 
                        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' onChange={this.handleFile} />
                    <span>.cvs, .xls, xlsx files only</span>

                    
                    { this.state.imported && 
                        <div className='Upload-selection-container'>
                            <span>Reading/Record</span>
                            {/**Names and classNames' first letters are capital to uniform with the state values */}
                            <select name='Read' onChange={this.handleListChange}>
                                <option value={undefined}>-- select --</option>
                                { this.state.rows[0].map( ( value, index ) => 
                                    <option className='Read' key={index} value={value}>{value}</option>    
                                )}
                            </select>
                            
                            <span>Calc./Theoretical</span>
                            <select name='Calc' onChange={this.handleListChange}>
                                <option value={undefined}>-- select --</option>
                                { this.state.rows[0].map( ( value, index ) => 
                                    <option className='Calc' key={index} value={value}>{value}</option>    
                                )}
                            </select>
                        </div>
                    }

                    { this.state.imported && <button className='Main-button Upload-button' onClick={this.handleUpload}>Upload</button> }
                </div>
            </div>
        );
    }
}

export default Upload;