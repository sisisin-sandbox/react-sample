import * as React from "react";
import {Flux, Component} from "flumpt";
import {render} from "react-dom";
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class MyComponent extends Component {
  componentDidMount() {
    this.dispatch("increment");
  }
  render() {
    return (
      <div>
        {this.props.count}
        <FlatButton label="increment" primary={true} onClick={() => this.dispatch("increment")}/>
      </div>
    );
  }
}

class App extends Flux {
  subscribe() { // `subscribe` is called once in constructor
    this.on("increment", () => {
      this.update(({count}) => {
        return {count: count + 1}; // return next state
      });
    });
  }
  render(state) {
    return <MyComponent {...state}/>;
  }
}


// Setup renderer
const app = new App({
  renderer: el => {
    render(el, document.querySelector(".content"));
  },
  initialState: {count: 0},
  middlewares: [
    // logger
    //   it may get state before unwrap promise
    (state) => {
      console.log(state);
      return state
    }
  ]
});

app.update(_initialState => ({count: 1})) // it fires rendering