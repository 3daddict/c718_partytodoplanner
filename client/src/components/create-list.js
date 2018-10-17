import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderTextArea, renderDate } from '../helpers';
import '../assets/css/create-list.scss';
import { createListData, authenticate } from '../actions';
import Header from './header';
import Footer from './footer';
import DatePicker from './date-picker';
import SignInModal from './sign-in-modal';

// import '../../node_modules/flatpickr/dist/themes/airbnb.css'
// import Flatpickr from 'react-flatpickr'

class CreateList extends Component{
    constructor() {
        super();
     
        this.state = {
            // date: new Date(),
            // enableTime: true,
            // dateFormat: "Y-m-d H:i"
            saved: false
        };
        this.getDate = this.getDate.bind(this);
      }
    getDate( dateString ){
        this.setState({
            date: dateString
        });
    }
    userCreateListData = (values) => {
        //const { name, description, securityStatus, eventTime} = request.body;
        console.log('Flatpickr Date: ', this.state.date);
        values.eventTime = this.state.date;
        let {eventDescription: description, eventName: name, eventTime} = values;
        const securityStatus = "locked";
        eventTime = eventTime[0].toJSON().slice(0, 19).replace('T', ' ');
        const newEventObject = { name, description, securityStatus, eventTime };
        this.props.createListData(newEventObject);
    }
    componentDidMount(){
        this.props.authenticate();
    }

    saveInfo=()=>{
        if( this.props.userInfo ){
            this.setState({
                saved: true
            });
        }
        else{
            return <SignInModal />;
        }
    }

    render(){
        console.log('Create List this.props :', this.props);
        const { handleSubmit } = this.props;
        const { saved } = this.state

        return(
            <div className="col-2">
            <header>
                <Header buttons={['Back_button', 'Home_nav_button']} history={this.props.history} />
            </header> 
                <div className='content'>
                    <div className="layout-container">

            
            <h6 className="create-list-heading">Create a new list by filling out the form below</h6>
                <form onSubmit={handleSubmit(this.userCreateListData)}>
                    <Field name="eventName" label="Event Name" component={ renderInput } placeholder="eg. Birthday Party" />
                    <Field name="eventDescription" label="Event Description" component={ renderTextArea }
                    caption="Enter some details about your event like where to park or how to get there."
                    placeholder="eg. Park on the street" 
                    />

                    <div className="form-row">
                        <div className="form-col">
                            <fieldset className="date-fieldset">
                                <legend className="form-input-label date-input-label">Enter Date and Time</legend>
                                    <div>
                                        <DatePicker sendDate={this.getDate} />
                                    </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col create-list-right">
                            <button onClick={this.saveInfo} className={saved ? "btn btn-saved" : "btn btn-green"}>{saved ? "✔️ Saved" : "Save"}</button>
                        </div>
                    </div>
                </form>
        
                    </div>
                </div>
                <footer>
                    <Link to={`/list/${this.props.url}`}><Footer buttons={['next_page_button']} /></Link>
                </footer>
            </div>
        )
    }
}

function validate(values){
    const { eventName, eventDateInput } = values;
    const errors = {};

    if(!eventName){
        errors.eventName = "Please enter a name for your event";
    }
    if(!eventDateInput){
        errors.eventDateInput = 'Please select the date of your event';
    }

    return errors;
}

function mapStateToProps(state){
    return {
        url: state.list.url,
        userInfo: state.user.userInfo
    }
}

CreateList = reduxForm({
    form: 'create_list_data',
    validate: validate
})(CreateList);

export default connect(mapStateToProps,{
    createListData: createListData, authenticate
})(CreateList); 