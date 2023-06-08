
import {useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Addcategory = () =>{

  let navigate = useNavigate();
  let [state,setState] = useState({category:""})

  useEffect(()=>{
    let sessionData = sessionStorage.getItem('username');
    // console.log(sessionData);
  
    if(sessionData==null){
      navigate('/')
    }
  })

  const  getInputData = (e) =>{
      let name = e.target.name;
      let value = e.target.value;

      setState({
        ...state, [name]:value
      })
  }

  const submitData = (e) =>{
    e.preventDefault();
     fetch("http://localhost:3001/category",{
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(state)
     })
     .then(async (ress)=>{
        let record = await ress.json();
        if(record){
            toast.success("Category Added successfully");
        } 
        else{
            toast.error("Something wrong");
        }
     })
     .catch((err)=>{
        toast.error("Something wrong");
     })
  }
    
    return(
       <div>
        
  &lt;&gt;
  <div className="page-wrapper" style={{marginLeft : "280px"}}>
    {/* ============================================================== */}
    {/* Bread crumb and right sidebar toggle */}
    {/* ============================================================== */}
    <div className="page-breadcrumb">
      <div className="row">
        <div className="col-12 d-flex no-block align-items-center">
          <h4 className="page-title">Category Basic</h4>
         
          <div className="ms-auto text-end">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Category</a></li>
                <li className="breadcrumb-item active" aria-current="page">
                  Library
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    {/* ============================================================== */}
    {/* End Bread crumb and right sidebar toggle */}
    {/* ============================================================== */}
    {/* ============================================================== */}
    {/* Container fluid  */}
    {/* ============================================================== */}
    <div className="container-fluid">
      {/* ============================================================== */}
      {/* Start Page Content */}
      {/* ============================================================== */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <form className="form-horizontal" method="post" onSubmit={(e)=>submitData(e)} >
              <div className="card-body">
                <h4 className="card-title">Category Form</h4>
                <div className="form-group row">
                  <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Enter Category</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="category" name="category"  placeholder="Enter category Here" onChange={(e)=>getInputData(e)}/>
                  </div>
                </div>
               
              </div>
              <div className="border-top">
                <div className="card-body">
                  <button type="submit" name="submit" value="Add Categroy" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          
        </div>
       
      </div>
      {/* editor */}
      
    </div>
  </div>  <ToastContainer></ToastContainer></div>


    )
}

export default Addcategory;