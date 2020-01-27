import React from 'react';
import './App.css';
import axios from 'axios';

class EmpUpdate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      empfname: '',
      empsurnam: '',
      empemail: '',
      empdob: '',
      empgen: '',
      employees: [],
      isLoaded: false,
      message: ''

    }

  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
     }

  GetClickhandle = (e) => {
    const { id } = this.state;
       axios.get('http://localhost:5000/selemp/' + id)
      .then(res => {
      
        if (res.data.length > 0) 
            {
            
          const employees = res.data;
          console.log("Inside update",res.data);
          this.setState({ employees, isLoaded: true })
          this.setState({
            id: this.state.employees[0].empno,
            empfname: this.state.employees[0].empfname,
            empsurnam: this.state.employees[0].empsurnam,
            empemail: this.state.employees[0].empemail,
            empdob: this.state.employees[0].empdob,
            empgen: this.state.employees[0].empgen

          })
        }
              
        else {
          const message = "NO records found"
          this.setState({
            message: message
          })
          console.log("message", message);

        }
      })

  }

  ClickUpdate = (event) => {
    event.preventDefault();

     
    var empId = this.state.id;
    var Fname1 = this.state.empfname;
    var surnam1 = this.state.empsurnam;
    var email1 = this.state.empemail;
    var DOB1 = this.state.empdob;
    var gender1 = this.state.empgen;

    const { id } = this.state;
    
          
      axios.put('http://localhost:5000/updemp/' + empId, { empId, Fname1, surnam1, email1, DOB1, gender1 })
      
      .then((response) => {
          console.log("chking success status", response.data);
        const message = response.data.message;
        this.setState({
          message: message
        })
      }
    
        )
    }     
  
    handleGenChange = (event) => {
    this.setState({
      empgen: event.target.value
    });
  }
  
  clickReset() {
    this.setState({
      id: '',
      empfname: '',
      empsurnam: '',
      empemail: '',
      empdob: '',
      empgen: '',
      message: ''
    })
  }

  render() {

    return (

      <div className="updform">
        <form>

          <div className="divfields">
            <p>
              <h2 className="headcss"> Update Existing Employee</h2></p>
          </div>

          <div>
            <p>
              {this.state.message}
            </p>
          </div>


          <div className="divfields">

            <label class="lbldisp">Employee Id :</label>
            <input type="text" className="txtbox" value={this.state.id} name="id" onChange={this.onChange}></input>
            <span></span>
            <span> <button className="btn btn-primary button" onClick={this.GetClickhandle} type='button'>Read</button></span>
          </div>

          <div className="divfields">
            <label className="form-check-label lblnames"> First Name : </label>
            <input type="text" className="txtbox" name="empfname" value={this.state.empfname} onChange={this.onChange} />
          </div>

          <div className="divfields">
            <label class="form-check-label lblnames">Sur Name : </label>
            <input type="text" className="txtbox" name="empsurnam" value={this.state.empsurnam} onChange={this.onChange} />
          </div>

          <div className="divfields">
            <label class="form-check-label lbldisp">Email : </label>
            <input type="text" className="txtbox" name="empemail" value={this.state.empemail} onChange={this.onChange} />
          </div>

          <div className="divfields">
            <label class="form-check-label lbldisp">DOB : </label>
            <input type="text" className="txtbox" name="empdob" value={this.state.empdob} onChange={this.onChange} />
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label lblgen">Gender :</label>
            <label className="form-check-label">
              <input type="radio" name="empgen" id="empgen" value="Male" onChange={this.handleGenChange} checked={this.state.empgen === 'Male'} />
              <label> Male </label>
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="radio" name="empgen" id="empgen" value="Female" onChange={this.handleGenChange} checked={this.state.empgen === 'Female'} />
              <label> Female </label>
            </label>
          </div>

          <div className="divfields">
            <button className="btn btn-primary" onClick={this.ClickUpdate} type='button'>Update Emp</button> <span></span>
            <span></span> <button className="btn btn-primary" onClick={this.clickReset.bind(this)} type='button'>Reset</button>
          </div>

        </form>
      </div>

    );
  }
}
export default EmpUpdate;


