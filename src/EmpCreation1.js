import React from 'react';
 import './App.css';
import axios from 'axios';
import './mystyle.css';
//import SimpleReactValidator from 'simple-react-validator';

class EmpCreation1 extends React.Component {

    constructor(props){
        super(props)

        var RandomId =  Math.floor(1000 + Math.random() * 500)
       
          this.state = {
                     
            empId:parseInt(RandomId),
           
             empfname1 : '',
             empsurnam1 :'',
             empemail1 :'',
             empdob1:'',
             empgen1:'',
             isLoaded: '',
              message :''
            /*  formerrors : {
             fnamerror :'',
             surnamerror :'',
             emailerror :'',
             doberror :'',
             gendererror :''
             } */
         } 

    }
    handleSubmit = (event) => {
            event.preventDefault();
           // alert("within hand sub");
          
            var empId = this.state.empId;
            var Fname1 = this.state.empfname1;
            var surnam1 = this.state.empsurnam1;
            var email1 = this.state.empemail1;
            var DOB1 = this.state.empdob1;
            var gen1 = this.state.empgen1;
                     
            
    /*  if (Fname1 === "") {
      alert("First Name must be filled out");
      return false;
    } 
           */

           /* if (surnam1 === "") {
            alert("SurName must be filled out");
            return false;
          } */
          

          /*  if (email1 === "") {
            alert("email must be filled out");
            return false;
          } */
           

           /* if (DOB1 === "") {
            alert("Date of Birth must be filled out");
            return false;
          } */
             
          
          /*  if (gen1 === "") {
            alert("Gender must be filled out");
            return false;
          }
            */

           //console.log("test",empId,Fname1,surnam1);
             axios.post('http://localhost:5000/empost',{empId,Fname1,surnam1,email1,DOB1,gen1})
                  .then((response) => {
                      // alert("employee created");
                    console.log("chking success status", response.data);
                    const message = response.data.message;
            this.setState({ 
              message : message
            })
            console.log("message",message);

                  });

                }
             
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
       this.setState(state)

        console.log("state value",state);
            }       
      // }
             
  
      
//Radio button handler:

handleGenChange=(event)=> {
    console.log("gender valueonchange",event.target.value);
    this.setState({
      empgen1: event.target.value
    });
    console.log("SAved Gender ", this.state.empgen1);
    }
 
 
 render() {
      return(
        <div className='createbody'>
         <form name="myForm" onSubmit={this.handleSubmit}>
         
          <div>
                                        
                  <p>
                    <h2> Create New Employee</h2>
                    </p>
                    <div>
                    <p>
                      {this.state.message}
                    </p>
                 </div>                
                    <p>
                     <label>First Name : </label> 
                         <input type='text' required  placeholder='firstname' name='empfname1' value = {this.empfname1} 
                            onChange = {this.onChange} >
                         </input>
                         </p>

                         <p>
                         <label>Surname : </label>
                         <input type='text' required placeholder='surname' name='empsurnam1' value = {this.empsurnam1} 
                            onChange = {this.onChange}>
                         </input>
                         </p>
                        

                         <p>
                         <label>Email : </label>
                         <input type='email' required placeholder='email' name='empemail1' value = {this.empemail1} 
                            onChange = {this.onChange}>
                         </input></p>
                         

                        <p>
                         <label>DOB : </label>
                         <input type='text' required placeholder='DOB' name='empdob1' value = {this.empdob1} 
                            onChange = {this.onChange}>
                         </input></p>
                          
                         <p>
                      <label>Gender : </label>
                        <input type="radio" name="empgen1" value="Male" onChange={this.handleGenChange}/>Male                                        
                         <input type="radio" name='empgen1' value="Female" onChange={this.handleGenChange} />Female
                      </p>
                         
                            <p> <button type ='submit' class="button"> Create </button></p>
                  </div>    
                      </form>
                      </div>       
             
             )
      }   
}
export default EmpCreation1;