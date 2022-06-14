import React from "react";
const Todo=()=>{
    const [Data_item,setData]=React.useState("")
    const [Data_qunatity,setData_quantity]=React.useState("")
    const[item,setitem]=React.useState([])
    const[loading,setLoading]=React.useState(false)
    const[error,setError]=React.useState(false)

    const get_item=()=>{
        setLoading(true)
        fetch(`http://localhost:3001/todo`)
        .then((res)=>res.json())
        .then((res)=>{
            setitem(res)
            setLoading(false)
        })
        .catch((err)=>{
            setError(true)
            setLoading(false)
            setitem([])
        })

    }
    React.useEffect(()=>{
        get_item()
    },[])
 
    console.log(item)
    
const additem=()=>{
    const data_qun={
        item:Data_item,
        qunatity:Data_qunatity,
        status:false, 
        
    }
   
    fetch(`http://localhost:3001/todo`,{
        method:"POST",
        body:JSON.stringify(data_qun),
        headers:{
            "content-type":"application/json"
        }
    })
    .then((res)=>res.json())
    .then((res)=>{get_item()})
    .catch((err)=>console.log("error"))

}
// if(loading){
//     return <h1>Loading.....</h1>
// }
// if(error){
//     return <h2>Some thing wrong.....</h2>
// }
return loading ?(<h1>Loading.....</h1>):error?(<h1>Some Error</h1>):(

<>
<div>
    <label htmlFor="">Enter the Item name</label>
    <input type="text" name="name" value={Data_item} id="" placeholder="Enter the item name" onChange={(e)=>setData(e.target.value)}/>
</div>
<div>
    <label htmlFor="">Enter the quantity</label>
    <input type="text" name="qunatity" value={Data_qunatity} placeholder="Enter the quantity"  onChange={(e)=>setData_quantity(e.target.value)}/>
  
</div>
<button onClick={additem}>Add Item</button>
<br />
<br />
<br />
<div>
{item.map((e)=>(
    <div key={e.id} className="div_dis">
        <b>ITEM:-{e.item}</b>
        <br />
        <b>QUANTITY:-{e.qunatity}</b>
        <br />
        <button >Not buy</button>
        <button >Remove</button>


    </div>
))}
    
</div>
</>

)
}
export default Todo