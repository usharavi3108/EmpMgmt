import React from 'react';
import axios from 'axios';
import './App.css';

class EmpDelete extends React.Component {
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
      message: '',
      isLoaded: false

    }
  }
  onChange = (e) => {

    e.preventDefault();
    const state = this.state
    console.log("value on change", this.state);

    state[e.target.name] = e.target.value;
    console.log("before set target id", e.target.value);
    this.setState(state);
    console.log("after set target id", e.target.value);
  }

  GetClickhandle = (e) => {
    alert("FEtchDetails");

    const { id } = this.state;
    console.log("id get", id);

    axios.get('http://localhost:5000/selemp/' + id)
      .then(res => {
        console.log("length", res.data.length);
        console.log("data from", res.data);

        if (res.data.length > 0) {

          console.log("data from", res.data);

          const employees = res.data;

          this.setState({ employees, isLoaded: true })
          this.setState({
            id: this.state.employees[0].empno,
            empfname: this.state.employees[0].empfname,
            empsurnam: this.state.employees[0].empsurnam,
            empemail: this.state.employees[0].empemail,
            empdob: this.state.employees[0].empdob,
            empgen: this.state.employees[0].empgen

          })
        } else {
          const message = "NO records found"
          this.setState({
            message: message
          })
          console.log("message", message);

        }
      })

  }

  ClickDelete = (event) => {
    event.preventDefault();

    console.log("state in delete", this.state);
    var empId = this.state.id;

    axios.delete('http://localhost:5000/delemp/' + empId)
      .then((response) => {

        console.log("chking success status", response.data);
        const message = response.data.message;
        this.setState({
          message: message
        })
        console.log("message", message);
      }
      )

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

      <div>
        <form>
          <div className="divfields">
            <p>
              <h2 className="headcss"> Delete Existing Employee</h2></p>
          </div>

          <div>
            <p>
              {this.state.message}
            </p>
          </div>

          <label class="lbldisp">Employee Id :  </label>
          <input type="text" className="seltxtbox" value={this.state.id} name="id" onChange={this.onChange}></input>
          <span></span>
          <span> <button className="btn btn-primary button" onClick={this.GetClickhandle} type='button'>Read</button></span>


          <div className="divfields">
            <label class="form-check-label lblnames">First Name : </label>
            <input className="seltxtbox" type="text" value={this.state.empfname} />
          </div>

          <div className="divfields">
            <label class="form-check-label lblnames">Surname : </label>
            <input className="seltxtbox" type="text" value={this.state.empsurnam} />
          </div>

          <div className="divfields">
            <label class="form-check-label lblnames">Email : </label>
            <input className="seltxtbox" type="text" value={this.state.empemail} />
          </div>

          <div className="divfields">
            <label class="form-check-label lblnames">DOB : </label>
            <input className="seltxtbox" type="text" value={this.state.empdob} />
          </div>


          <div className="form-check form-check-inline">
            <label className="form-check-label lblgen">Gender:</label>
            <label className="form-check-label">
              <input type="radio" value={this.state.empgen} checked={this.state.empgen === 'Male'} onChange={this.handleGenChange} />
              <label> Male </label>
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label"></label>
            <input type="radio" value={this.state.empgen} checked={this.state.empgen === 'Female'} onChange={this.handleGenChange} />
            <label> Female </label>
          </div>
          <div>
            <button className="btn btn-primary" onClick={this.ClickDelete} type='button'>Delete Employee</button>
            <span></span> <button className="btn btn-primary" onClick={this.clickReset.bind(this)} type='button'>Reset</button>
          </div>

        </form>
      </div>

    );
  }

}
export default EmpDelete;

