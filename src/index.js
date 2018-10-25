import React from "react";
import AutoSelector from "./AutoSelector";
import ReactDOM from "react-dom";
import "./styles.css";
const xxxx = [
  <div className="withImage">
    <img src="https://www.gstatic.com/kpui/social/twitter_32x32.png" />
    <p>tegegregergregregregregreg</p>
  </div>,
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
      data: xxxx
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
          label="sdvdsvdsvsv"
          isMultipleSelection={undefined}
          errorMessage="sfvlmfsvjsdvjdsnvkjdsnvkjdsnvkjdsnvkjdsnvkjdsnv"
          onChange={input => {
            console.log(
              "inputtttttttttttttttttttttttttttttttttttttttttttttttttt",
              input
            );

            return this.getData(input);
          }}
          dataEmptyMsg={<span>xyz</span>}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
