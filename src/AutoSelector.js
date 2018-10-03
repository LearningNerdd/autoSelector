import React from "react";
import get from "lodash/get";
import classnames from "classnames";

class AutoSelector extends React.Component {
  constructor(props) {
    super(props);
    const { data, showDropdown, defaultSelection } = this.props;
    this.state = {
      currentHoverIndex: null,
      currentSelection: defaultSelection,
      placeHolderText: null,
      currentData: data,
      showDropdown,
      currentMultipleSelections: []
    };
  }

  handleKeyPress = e => {
    const { currentHoverIndex, currentData } = this.state;
    if (e.keyCode === 38 && currentHoverIndex > 0) {
      this.setState(prevState => ({
        currentHoverIndex: prevState.currentHoverIndex - 1
      }));
    } else if (e.keyCode === 40 && currentHoverIndex < currentData.length - 1) {
      this.setState(prevState => ({
        currentHoverIndex: prevState.currentHoverIndex + 1
      }));
    } else if (e.keyCode === 13) {
      this.setState({
        currentSelection: currentData[currentHoverIndex],
        currentHoverIndex: null,
        showDropdown: false
      });
    }
  };

  onItemClick = e => {
    const { onSelectItem, isMultipleSelection } = this.props;
    const { currentData } = this.state;
    const selectedIndex = e.currentTarget.getAttribute("data-id");
    const currentItem = currentData[selectedIndex];
    this.setState(
      {
        currentSelection: currentItem,
        showDropdown: false
      },
      () => {
        onSelectItem && onSelectItem(currentItem);
      }
    );
  };

  getSelectedItemListingStyle = listItem => {
    const { getSelectedItemListingStyle } = this.props;
    if (getSelectedItemListingStyle) {
      return getSelectedItemListingStyle(listItem);
    }
    return listItem;
  };

  getItemListingStyle = listItem => {
    const { getItemListingStyle } = this.props;
    if (getItemListingStyle) {
      return getItemListingStyle(listItem);
    }
    return listItem;
  };

  getListItemStyling = (listItem, isSelectionDone = false) => {
    const { isDropDownIcon } = this.props;
    if (listItem && isSelectionDone) {
      return (
        <div
          onClick={() => {
            this.toggleDropdown();
          }}
          onKeyDown={this.handleKeyPress}
          className={classnames("selected-input", {
            dropdown: isDropDownIcon
          })}
          tabindex="1"
        >
          {this.getSelectedItemListingStyle(listItem)}
        </div>
      );
    }
    return this.getItemListingStyle(listItem);
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown
    }));
  };

  getCoreInputElement = () => {
    const {
      isDropDownIcon,
      readonly,
      onFocus,
      onClick,
      onChange,
      onBlur,
      isError
    } = this.props;
    const { showDropdown } = this.state;
    return (
      <input
        onKeyDown={this.handleKeyPress}
        readonly={readonly}
        onFocus={() => {
          onFocus && onFocus();
        }}
        onClick={() => {
          this.toggleDropdown();
          onClick && onClick();
        }}
        onChange={e => {
          const userInput = get(e, "target.value", "");
          onChange && onChange(userInput);
        }}
        className={classnames("field-label", {
          "error-dropdown": isError
        })}
      />
    );
  };

  getInputHeader = () => {
    const { isDropDownIcon } = this.props;
    return isDropDownIcon ? (
      <div className="dropdown">{this.getCoreInputElement()}</div>
    ) : (
      this.getCoreInputElement()
    );
  };

  render() {
    const {
      currentSelection,
      currentHoverIndex,
      showDropdown,
      currentData
    } = this.state;
    const {
      listContainerClassName,
      containerclassName,
      errorMessage,
      label
    } = this.props;
    const { onItemClick } = this;
    const selectHeader =
      this.getListItemStyling(currentSelection, true) || this.getInputHeader();
    return (
      <div className={`select ${containerclassName}`}>
        {label && (
          <label
            className={classnames("field-label", {
              "focused-label": showDropdown
            })}
          >
            {label}
          </label>
        )}
        {selectHeader}
        {!showDropdown &&
          errorMessage && <span className="error-message">{errorMessage}</span>}
        {!!showDropdown && (
          <ul className={`dropdown-list ${listContainerClassName}`}>
            {currentData.map((listItem, index) => (
              <li
                key={index}
                data-id={index}
                className={classnames("option", {
                  "hover-style": currentHoverIndex === index
                })}
                onClick={e => {
                  onItemClick(e);
                }}
              >
                {this.getListItemStyling(listItem)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default AutoSelector;
