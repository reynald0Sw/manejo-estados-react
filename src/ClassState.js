import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  componentDidUpdate() {
    console.log("Actualizacion ===> componentDidUpdate");
    if (this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la Valisacion");
        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }
        console.log("Terminando la Valisacion");
      }, 1000);
    }
  }

  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>
        <p>The security code to verify that you want to delete, please.</p>

        {this.state.error && !this.state.loading && (
          <p>Error: The code is incorrect</p>
        )}

        {this.state.loading && <Loading />}

        <input
          placeholder="Security code"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ loading: true })}>Check</button>
      </div>
    );
  }
}

export { ClassState };
