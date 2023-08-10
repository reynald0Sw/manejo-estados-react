import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [ state, setState ] = React.useState({
    value: "",
    error: false,
    loading:false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading:false,
      confirmed:true,
    })
  }
  const onError = () => {
    setState({
      ...state,
      error:true,
      loading:false,
    })
  }
  const onWrite = (newValue)=> {
    setState({
      ...state,
      error:false,
      value:newValue,
    })
  }
  const onCheck = () => {
    setState({
      ...state,
      loading:true,
    }) 
  }
  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  }
  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value:"", //estado Borrado
    });
  }

  React.useEffect(() => {
    console.log("Empezando el efecto!");
    if (state.loading) {
      setTimeout(() => {
        console.log("Haciendo la Valisacion");
        if (state.value === SECURITY_CODE) {
          onConfirm();
          // setLoading(false);
        } else {          
          onError();
        }
        console.log("Terminando la Valisacion");
      }, 1000);
    }
    console.log("Terminando el efecto!");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>The security code to verify that you want to delete, please.</p>
  
        {(state.error && !state.loading) && <p>Error: The code is incorrect</p>}
        {state.loading && <p>loading..</p>}
  
        <input
          placeholder="Security code"
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value);
          
          }}
        />
        <button 
          onClick={() => {
            // setError(false)
            onCheck();        
          }}>Check</button>
      </div>
    );
  } else if(state.confirmed && !state.deleted) {
    return(
      <React.Fragment>
        <p>We request confirmation. Are you sure?"</p>

        <button 
         onClick={()=>{
          onDelete();
         }}
        >
          Yes,Delete
        </button>

        <button 
         onClick={()=>{
          onReset();
         }}
        >
          No,please
        </button>

      </React.Fragment>
    );
  } else{
    return(
      <React.Fragment>
        <p>Deleted successfully</p>
        <button 
         onClick={()=>{
          onReset();
         }}
        >
          Reset, go back!
        </button>

      </React.Fragment>
    );
  }
}

export { UseState };
