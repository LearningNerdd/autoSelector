import React from "react";
import get from "lodash/get";
import classnames from "classnames";
import range from "lodash/range";
import "./styles.css";


class AutoSelector extends React.Component {
  constructor(props) {
    super(props);
    const { data, showDropdown, defaultSelection } = this.props;

    this.state = {
      currentHoverIndex: null,
      currentSelection: defaultSelection,
      placeHolderText: null,
      currentData: data,
      initialData: data,
      showDropdown,
      currentMultipleSelections: []
    };
  }

  handleKeyPress = e => {
    const { currentHoverIndex, currentData } = this.state;
    const { onEscapeShowSuggestion } = this.props;
    if (e.keyCode === 38 && currentHoverIndex > 0) {
      this.setState(
        prevState => ({
          currentHoverIndex: prevState.currentHoverIndex - 1
        }),
        () => {
          this.scrollList(38);
        }
      );
    } else if (e.keyCode === 40 && currentHoverIndex < currentData.length - 1) {
      this.setState(
        prevState => ({
          currentHoverIndex: prevState.currentHoverIndex + 1
        }),
        () => {
          this.scrollList(40);
        }
      );
    } else if (e.keyCode === 13) {
      this.setState({
        currentSelection: currentData[currentHoverIndex],
        currentHoverIndex: null,
        showDropdown: false
      });
    } else if (e.keyCode === 27 && !onEscapeShowSuggestion) {
      this.setState({
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
    const { initialData } = this.state;
    const { isDropDownIcon } = this.props;
    if (listItem && isSelectionDone) {
      return (
        <div
          onClick={() => {
            this.toggleDropdown();
            this.setState({
              currentData: initialData
            });
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
          if (onFocus) {
            const updatedData = onFocus();
            updatedData &&
              this.setState({
                currentData: updatedData,
                showDropdown: true
              });
          }
        }}
        onClick={() => {
          this.toggleDropdown();
          if (onClick) {
            const updatedData = onClick();
            updatedData &&
              this.setState({
                currentData: updatedData,
                showDropdown: true
              });
          }
        }}
        onChange={e => {
          const userInput = get(e, "target.value", "");
          if (onChange) {
            const updatedData = onChange(userInput);
            this.setState({
              currentData: updatedData,
              showDropdown: true
            });
          }
        }}
        className={classnames("field-label", {
          "error-dropdown": isError
        })}
        autoFocus
      />
    );
  };

  scrollList = keycodeValue => {
    const { currentHoverIndex } = this.state;
    if (this.suggestionList) {
      console.log("scroll!", this.suggestionList.scrollTop);
      let newTopValue = this.suggestionList.scrollTop;
      const listElement = document.getElementsByClassName("option");
      const listContainer = document.getElementsByClassName("dropdown-list")[0];
      this.suggestionList.scrollTop =
        listElement[currentHoverIndex].offsetTop +
        listElement[currentHoverIndex].clientHeight -
        listContainer.clientHeight; //newTopValue;
    }
  };

  componentDidUpdate() {
    var minHeightLi = 1;
    if (this.suggestionList && !this.state.liHeight) {
      var items = this.suggestionList.getElementsByTagName("li");
      range(0, items.length).forEach(i => {
        const item = items[i];
        const liHeightItm = item.clientHeight;
        if (liHeightItm > minHeightLi) {
          minHeightLi = liHeightItm;
        }
      });
      if (minHeightLi < 37) minHeightLi = 37;
      this.setState({
        liHeight: minHeightLi
      });
    }
  }

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
      label,
      dataEmptyMsg
    } = this.props;
    const { onItemClick } = this;
    const selectHeader =
      (!showDropdown && this.getListItemStyling(currentSelection, true)) ||
      this.getInputHeader();
    console.log("this.state", this.state);
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
          <ul
            className={`dropdown-list ${listContainerClassName}`}
            ref={suggestionList => {
              this.suggestionList = suggestionList;
            }}
          >
            {currentData &&
              currentData.map((listItem, index) => (
                <li
                  key={index}
                  data-id={index}
                  className={classnames("option", {
                    "hover-style": currentHoverIndex === index
                  })}
                  onClick={e => {
                    onItemClick(e);
                  }}
                  style={{ minHeight: `${this.state.liHeight}px` }}
                >
                  {this.getListItemStyling(listItem)}
                </li>
              ))}

            {currentData &&
              currentData.length < 1 && (
                <li
                  key={1}
                  data-id={1}
                  className={classnames("no-result data-empty")}
                >
                  {dataEmptyMsg ? (
                    <span>{dataEmptyMsg}</span>
                  ) : (
                    <span>Data</span>
                  )}
                </li>
              )}
          </ul>
        )}
      </div>
    );
  }
}

export default AutoSelector;
