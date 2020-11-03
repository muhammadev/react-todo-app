import React, { Component } from "react";

class InputField extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      displayCharLength: false,
      charLength: 0,
      maxChars: 60,
    };
  }

  handleMainInputKeyup = (e) => {
    // force maxLength input attribute on mobile browsers
    let value = e.target.value;
    if (e.target.value.length >= this.state.maxChars) {
      let mainInputTag = document.querySelector(".main-npt");
      mainInputTag.value = value.substr(0, this.state.maxChars);
    }

    // go to the body input field
    let secondInputTag = document.querySelector(".second-npt");
    if (e.keyCode === 13) {
      secondInputTag.focus();
    }
  };

  handleMainInputChange = (e) => {
    let value = e.target.value;
    let charLength = value.length;

    if (charLength <= this.state.maxChars) {
      this.setState({
        charLength,
      });
    } else {
      this.setState({
        charLength: this.state.maxChars,
      });
    }

    if (charLength > 0) {
      this.setState({ displayCharLength: true });
    }

    this.setState({
      title: value,
    });
  };

  // remove the length counter span...
  hideCharLengthCounter = () => {
    this.setState({ displayCharLength: false });
  };

  handleSecondInputChange = (e) => {
    let value = e.target.value;

    this.setState({ body: value });
  };

  // calculate the required height to display the whole text and apply the result to the height css property...
  resizeTextareaFocus = () => {
    let textArea = document.querySelector(".second-npt");
    let neeededHeight = textArea.scrollHeight;
    textArea.style.height = neeededHeight + "px";
  };

  // return everything (width and height) to the standard...
  resizeTextareaBlur = () => {
    let textArea = document.querySelector(".second-npt");
    textArea.style.width = 100 + "%";
    textArea.style.height = 40 + "px";
  };

  adjustInputTags = (focus) => {
    if (focus) {
      let mainInputTag = document.querySelector(".main-npt");
      // let cssOfMain = getComputedStyle(mainInputTag);
      mainInputTag.style.height = "50px";
      mainInputTag.style.paddingBottom = "15px";
      // mainInputTag.style.borderColor = cssOfMain.getPropertyValue("--border");
      // mainInputTag.style.borderBottomColor = "#dfe1e5";
      mainInputTag.style.borderBottomLeftRadius = 0 + "px";
      mainInputTag.style.borderBottomRightRadius = 0 + "px";

      let secondInputTag = document.querySelector(".second-npt");
      secondInputTag.style.borderColor = "#333";
      secondInputTag.style.borderTopColor = "transparent";
      secondInputTag.style.borderTopLeftRadius = 0 + "px";
      secondInputTag.style.borderTopRightRadius = 0 + "px";

      let submitBtn = document.querySelector(".btn-submit");
      submitBtn.classList.add("focus");
    }

    if (!focus) {
      let mainInputTag = document.querySelector(".main-npt");
      mainInputTag.style.height = "40px";
      mainInputTag.style.paddingBottom = "0px";
      // mainInputTag.style.borderColor = "#dfe1e5";
      mainInputTag.style.borderBottomLeftRadius = 5 + "px";
      mainInputTag.style.borderBottomRightRadius = 5 + "px";

      let secondInputTag = document.querySelector(".second-npt");
      // secondInputTag.style.borderColor = "#dfe1e5";
      secondInputTag.style.borderTopLeftRadius = 5 + "px";
      secondInputTag.style.borderTopRightRadius = 5 + "px";

      let submitBtn = document.querySelector(".btn-submit");
      submitBtn.classList.remove("focus");
    }
  };

  render() {
    let { addNote } = this.props;
    return (
      <div className="npt-container">
        {this.state.displayCharLength ? (
          <span
            style={{
              position: "absolute",
              top: "30px",
              left: "1px",
              paddingLeft: "5px",
              paddingRight: "5px",
              lineHeight: "1",
              color: "#999",
              zIndex: "3",
              borderTop: "1px solid #dfe1e5",
            }}
            className="length-counter"
          >
            <small>
              Max: {this.state.maxChars} &nbsp;
              {/* the &nbsp; entity means non breaking space */} Left:{" "}
              {this.state.maxChars - this.state.charLength}
            </small>
          </span>
        ) : null}
        <input
          className="npt-note main-npt"
          type="text"
          dir="auto"
          placeholder="Example: Do Not Forget to Workout"
          onKeyUp={this.handleMainInputKeyup}
          onChange={this.handleMainInputChange}
          maxLength={this.state.maxChars}
          onFocus={() => {
            this.adjustInputTags(true);
          }}
          onBlur={() => {
            setTimeout(this.hideCharLengthCounter, 0);
            this.adjustInputTags(false);
          }}
        />

        <textarea
          className="npt-note second-npt"
          type="text"
          dir="auto"
          placeholder="Details..."
          onChange={(e) => {
            this.resizeTextareaFocus();
            this.handleSecondInputChange(e);
          }}
          onFocus={() => {
            this.adjustInputTags(true);
            this.resizeTextareaFocus();
          }}
          onBlur={() => {
            this.resizeTextareaBlur();
            this.adjustInputTags(false);
          }}
        ></textarea>
        <button
          className="btn-submit"
          onClick={() => {
            let { title, body } = this.state;
            let mainInputTag = document.querySelector(".main-npt");
            let secondInputTag = document.querySelector(".second-npt");
            // let submitBtn = document.querySelector(".btn-submit");
            if (title.length > 0) {
              addNote({ title, body });
              mainInputTag.value = "";
              secondInputTag.value = "";
              this.setState({
                title: "",
                body: "",
              });
              setTimeout(() => {
                console.log("this is the state", this.state);
              }, 1000);
            } else {
              mainInputTag.focus();
            }
          }}
        >
          Add Note
        </button>
      </div>
    );
  }
}
export default InputField;
