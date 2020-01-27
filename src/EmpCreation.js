import React from 'react';
import './App.css';
import axios from 'axios';
import './mystyle.css';

class EmpCreation extends React.Component {

  constructor(props) {
    super(props)

    var RandomId = Math.floor(1000 + Math.random() * 500)

    this.state = {

      empId: parseInt(RandomId),
      empfname1: '',
      empsurnam1: '',
      empemail1: '',
      empdob1: '',
      empgen1: '',
      isLoaded: '',
      message: ''

    }

  }
  handleSubmit = (event) => {
    event.preventDefault();

    var empId = this.state.empId;
    var Fname1 = this.state.empfname1;
    var surnam1 = this.state.empsurnam1;
    var email1 = this.state.empemail1;
    var DOB1 = this.state.empdob1;
    var gen1 = this.state.empgen1;

    axios.post('http://localhost:5000/empost', { empId, Fname1, surnam1, email1, DOB1, gen1 })
      .then((response) => {
       
        const message = response.data.message;
        this.setState({
          message: message
        })
       
      });

  }

  // Onchange Event     
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
      }

  //Radio button handler:

  handleGenChange = (event) => {

     this.setState({
      empgen1: event.target.value
    });
   
  }
  clickReset() {
    this.setState({
      empId: '',
      empfname1: '',
      empsurnam1: '',
      empemail1: '',
      empdob1: '',
      empgen1: '',
      isLoaded: '',
      message: ''
        })
       }


  render() {
    return (
      <div className='createbody'>
        <form name="myForm" onSubmit={this.handleSubmit}>

          <div >
            <p>
              <h3 className="headcss"> Create New Employee</h3>
              <br></br>
            </p>
            <div>
              <p>
                {this.state.message}
              </p>
            </div>
            <div className="divfields">
              <label className="form-check-label lblnames">First Name :   </label>
              <input type='text' className="txtbox" required placeholder='firstname' name='empfname1' value={this.empfname1}
                onChange={this.onChange}>
              </input>
            </div>

            <div className="divfields">
              <label className="form-check-label lblnames">Sur Name : </label>
              <input type='text' className="txtbox" required placeholder='surname' name='empsurnam1' value={this.empsurnam1}
                onChange={this.onChange}>
              </input>
            </div>

            <div className="divfields">
              <label className="form-check-label lbldisp">Email : </label>
              <input type='email' className="txtbox" required placeholder='email' name='empemail1' value={this.empemail1}
                onChange={this.onChange}>
              </input>
            </div>

            <div className="divfields">
              <label className="form-check-label lbldisp">DOB : </label>
              <input type='text' className="txtbox" required placeholder='DOB' name='empdob1' value={this.empdob1}
                onChange={this.onChange}>
              </input>
            </div>

            <div className="form-check form-check-inline">
              <label className="form-check-label lblgen">Gender:</label>
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="empgen1" id="empgen1" value="Male" onChange={this.handleGenChange} />
                Male
     </label>
            </div>

            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="empgen1" id="empgen1" value="Female" onChange={this.handleGenChange} />
                Female
  </label>
            </div>
            <div className="divfields">
              <button type='submit' className="btn btn-primary" onClick={this.handleSubmit}>Create </button>
              <span></span> <button className="btn btn-primary" onClick={this.clickReset.bind(this)} type='button'>Reset</button>
            </div>
          </div>
        </form>
      </div>

    )
  }
}
export default EmpCreation;