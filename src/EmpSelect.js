import React from 'react';
import axios from 'axios';
import './App.css';
import './mystyle.css';

class EmpSelect extends React.Component {
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
          );
        console.log("after set target id",e.target.value);
      }

    
      handleGenChange=(event)=> {
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
           if(res.data.length>0)
           {
           
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
          }else
          {
            const message = "NO records found"
            this.setState({ 
              message : message
            })
            console.log("message",message);
            
          }
          })
         
        }                            
            
     render() {
          return ( 
            <div className='createbody'>
                 <form> 
                 <div>
                 <p>
               <h3 className="headcss"> Read Employee</h3></p>
               </div> 
               <div>
                    <p>
                      {this.state.message}
                    </p>
                 </div>
              <div className="divfields">
              <label className= "form-check-label lblnames">Employee Id :</label>
             <input className="seltxtbox" type="text"  value={this.state.id} name="id"  onChange = {this.onChange} required></input>
             <span></span>
           <span> <button  className="btn btn-primary button" onClick={this.GetClickhandle} type = 'button'> Read</button></span>
                    </div>
                 <div  className="divfields"> 
               <label className= "form-check-label lblnames"> First Name : </label>
              <input type="text" className="seltxtbox" value={this.state.empfname}/> 
              </div>
              <div className="divfields" >   
             <label className= "form-check-label lblnames">Sur Name : </label>
             <input type="text"  className="seltxtbox" value={this.state.empsurnam}/> 
              </div>
              <div className="divfields">
             <label className= "form-check-label lblnames lbldisp">Email : </label>
             <input type="text"  className="seltxtbox" value={this.state.empemail}/>
             </div>
             <div className="divfields">
             <label  className= "form-check-label lbldisp">DOB : </label>
             <input type="text"  className="seltxtbox" value={this.state.empdob}/> 
             </div>
         
             <div className="form-check form-check-inline">
    <label className="form-check-label lblgen">Gender :</label>
    <label className="form-check-label">
             <input type="radio" value= {this.state.empgen}
                      checked={this.state.empgen === 'Male'} 
                            onChange={this.handleGenChange}/>
                                  <label> Male </label> 
                      </label>
                      </div>

                    <input type="radio" value={this.state.empgen} 
                      checked={this.state.empgen === 'Female'} 
                      onChange={this.handleGenChange} />
                       <label> Female </label> 
                                  
              </form>
            </div>
           )
     }
    }
     export default EmpSelect;
                  