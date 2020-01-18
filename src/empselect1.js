import React from 'react';
import axios from 'axios';
import './App.css';
import './mystyle.css';

class empselect1 extends React.Component {
         constructor(props) {
                 super(props);

         this.state = {
           id:'',
           empfname:'',
           empsurnam:'',
           empemail:'',
           empdob:'',
           empgen:'',
          employees:[],
          isLoaded: false
         
        
          }
        }   
       onChange = (e) => {
        e.preventDefault();
        const state = this.state
        console.log("value on change",this.state);
        
        state[e.target.name] = e.target.value;
        console.log("before set target id",e.target.value);
        this.setState({
          
          id: e.target.value
          
        },
         ()=> {this.validatefirstname();
        }
        );
        console.log("after set target id",e.target.value);
      }


      validatefirstname = () => {
        const { empfname } = this.state;
        this.setState({
          nameError:
          empfname.length > 3 ? null : 'Name must be longer than 3 characters'
        });
      }

      handleGenDisplay=(event)=> {
        console.log(event.target.value);
        this.setState({
          empgen:event.target.value
                });
                
              }
    

      GetClickhandle = (e) => {
         alert("FEtchDetails");
         
         const {id} = this.state;
         console.log("id get", id);
      
         axios.get('http://localhost:5000/selemp/'+id)
           .then(res => 
          {
           
           console.log("length",res.data.length);
           console.log("data from",res.data);

           const employees = res.data;
           console.log("Inside get",employees);
           this.setState({employees,isLoaded: true})
           this.setState({ 
                empfname :this.state.employees[0].empfname,
                empsurnam:this.state.employees[0].empsurnam,
                empemail:this.state.employees[0].empemail,
                empdob:this.state.employees[0].empdob,
                empgen:this.state.employees[0].empgen,
                
           })
          })
           
        }                            
            
     render() {
  

          return ( 
           
            <div>
               <form>
            <div className="App-intro">              
               <h3>Employee Management  </h3>

               <p>
               <button   onClick={this.handleClearForm}>Create</button>
                <button  onClick={this.handleClearForm}>Read</button>
                <button onClick={this.handleClearForm}>Update</button>
                <button onClick={this.handleClearForm}>Delete</button>
                 </p>
                 <p>
                 <label>Emp Id :</label>
                   <input className="inputcss" type="text" value={this.state.id} name="id"  onChange = {this.onChange} required></input>
                    <button  onClick={this.GetClickhandle} type = 'button'>GetEmp Details</button>
                 </p>
              </div> 
               <p> 
               <label>First Name : </label>
              <input type="text" value={this.state.empfname}/> 
              </p>

             <p>   
             <label>Surname : </label>
             <input type="text" value={this.state.empsurnam}/> 
              </p>
             
             <p>
             <label>Email : </label>
             <input type="text" value={this.state.empemail}/>
             </p>
             
             <p>
             <label>DOB : </label>
             <input type="text" value={this.state.empdob}/> 
             </p>

            <p>
            <label>Gender : </label>
             {/* <input type="text" value={this.state.empgen}/>  */}
             <label> Male </label> 
             <input type="radio" value="empgen" 
                      checked={this.state.empgen === 'Male'} 
                     
                     onChange={this.handleGenDisplay} />
                       <label> Female </label> 
             <input type="radio" value="empgen" 
                      checked={this.state.empgen === 'Female'} 
                      onChange={this.handleGenChange} />
          
            </p> 

            
                     
            </form>
            </div>
                
             );  
     }
 
    }   
    export default empselect1;

  