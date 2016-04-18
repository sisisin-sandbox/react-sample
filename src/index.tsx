/// <reference path="../typings/browser.d.ts" />

import * as React from "react";
import {Flux, Component} from "flumpt";
import {render} from "react-dom";
//import FlatButton from 'material-ui/lib/flat-button';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

interface State {
  count:number;
}
interface Props {
  count:number;
}

class MyComponent extends Component<Props,State> {
  props:Props;
  componentDidMount() {
    this.dispatch("increment");
  }
  render() {
    return (
      <div>
        {this.props.count}
        <button onClick={() => this.dispatch("increment")}>increment</button>
      </div>
    );
  }
}


class App extends Flux<State> {
  subscribe() { // `subscribe` is called once in constructor
    this.on("increment", () => {
      this.update(({count}) => {
        return {count: count + 1}; // return next state
      });
    });
  }
  render(state: State) {
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