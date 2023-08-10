import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

 
  
  React.useEffect(() => {
    console.log("Empezando el efecto!");
    
    if (state.loading) {
      setTimeout(() => {
        console.log("Haciendo la Valisacion");
        if (state.value === SECURITY_CODE) {
          dispatch({
            type: actionTypes.confirm,
          });
          // setLoading(false);
        } else {
          dispatch({
            type: "ERROR",
          });
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

        {state.error && !state.loading && <p>Error: The code is incorrect</p>}
        {state.loading && <p>loading..</p>}

        <input
          placeholder="Security code"
          value={state.value}
          onChange={(event) => {
            dispatch({
              type: "WRITE", payload: event.target.value
            });
            // onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            // setError(false)
            dispatch({
              type: "CHECK",
            });
            // onCheck();
          }}
        >
          Check
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>We request confirmation. Are you sure?"</p>

        <button
          onClick={() => {
            dispatch({
              type: "DELETE",
            });
            // onDelete();
          }}
        >
          Yes,Delete
        </button>

        <button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
            // onReset();
          }}
        >
          No,please
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Deleted successfully</p>
        <button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
            // onReset();
          }}
        >
          Reset, go back!
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: 'CONFIRM',
};

const reducerObject = (state, payload) => ({

  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  "WRITE":{
    ...state,
    value: payload
  },
  CHECK: {
    ...state,
    loading: true,
  },
  DELETE:{
    ...state,
    delete: true,
  },
  RESET:{
    ...state,
    confirmed: false,
    deleted: false,
    value:"",
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
