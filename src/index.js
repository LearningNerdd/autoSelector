import React from "react";
import ReactDOM from "react-dom";
import AutoSelector from "./AutoSelector";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <AutoSelector
        data={[
          <div className="withImage">
            <img src="https://www.gstatic.com/kpui/social/twitter_32x32.png" />
            <p>tegegregergregregregregreg</p>
          </div>,
          "ergregregregregregregregregreggreg",
          <p>ergregregregregregregregregregregrgregreg</p>
        ]}
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
        isDropDownIcon
        defaultSelection={
          <div className="withImage">
            <img src="https://www.gstatic.com/kpui/social/twitter_32x32.png" />
            <p>tegegregergregregregregreg</p>
          </div>
        }
        isMultipleSelection={undefined}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
