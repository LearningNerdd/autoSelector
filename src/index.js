import React from "react";
//import AutoSelector from "autoselector/dist/AutoSelector";
import AutoSelector from "./AutoSelector";
import ReactDOM from "react-dom";
const xxxx = [
  <div className="withImage">
    <img src="https://www.gstatic.com/kpui/social/twitter_32x32.png" />
    <p>tegegregergregregregregreg</p>
  </div>,
  "aergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "xxergregregregregregregregregreggreg",
  "xxergregregregregregregregregreggreg",
  "xxergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  "ergregregregregregregregregreggreg",
  <p>ergregregregregregregregregregregrgregreg</p>
];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: xxxx,
      errorMessage: ""
    };
  }

  getData = input => {
    const dataTarget = [];
    this.state.data.forEach(d => {
      if (typeof d === "string" && d.indexOf(input) !== -1) {
        dataTarget.push(d);
      }
    });
    console.log("dataTarget", dataTarget);
    return dataTarget;
  };
  render() {
    console.log("this.state", this.state);
    return (
      <div className="App">
        <AutoSelector
          data={this.state.data}
          getItemListingStyle={listItem => {
            const listItemDetails =
              typeof listItem === "string" ? <p>{listItem}</p> : listItem;
            return listItemDetails;
          }}
          getSelectedItemListingStyle={listItem => {
            const listItemDetails =
              typeof listItem === "string" ? <p>{listItem}</p> : listItem;
            return listItemDetails;
          }}
          onSelectItem={listItem => {
            //console.log("listItem", listItem);
          }}
          label="dropdown list"
          isMultipleSelection={undefined}
          errorMessage={this.state.errorMessage}
          onChange={input => {
            if (input && input.indexOf("x") !== -1) {
              this.setState({
                errorMessage: "Enter Valid input"
              });
            } else {
              this.setState({
                errorMessage: ""
              });
            }
            return this.getData(input);
          }}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
