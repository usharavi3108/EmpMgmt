import React from 'react';
import axios from 'axios';
import './App.css';

class AxiEmp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          empId: '',
        }
      }

      componentDidMount() {
        axios.get('http://localhost:5000/selempall')
                 .then(response => {
          this.setState({empId: response.data.message });
        })
        .catch(error => {
          console.log(error);
        });
      }

      render() {
        const { empId } = this.state;
        return (
            axios.get("/employees")
            .then(response => {
                console.log("employees:", response) 
                this.setState({employees:response.employees[0]})
            }
            )
           
        );
      }
}
export default AxiEmp;

