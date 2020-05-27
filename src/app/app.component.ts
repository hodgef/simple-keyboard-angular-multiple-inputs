import { Component, ViewEncapsulation } from "@angular/core";
import Keyboard from "simple-keyboard";

@Component({
  selector: "app-root",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./app.component.html",
  styleUrls: [
    "../../node_modules/simple-keyboard/build/css/index.css",
    "./app.component.css"
  ]
})
export class AppComponent {
  value = "";
  keyboard: Keyboard;
  selectedInputElem: any;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      debug: true,
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      preventMouseDownDefault: true
    });

    this.selectedInputElem = document.querySelector(".input:first-child");

    document.querySelectorAll(".input").forEach(input => {
      input.addEventListener("focus", this.onInputFocus);
      input.addEventListener("input", this.onInputChange);
    });
  }

  onInputFocus = (event: any) => {
    this.selectedInputElem = event.target;

    console.log("Focused input", this.selectedInputElem);

    this.keyboard.setOptions({
      inputName: event.target.id
    });
  };

  setInputCaretPosition = (elem: any, pos: number) => {
    if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);
    }
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value, event.target.id);
  };

  onChange = (input: string) => {
    this.selectedInputElem.value = input;
    console.log("Input changed", input);

    /**
     * Synchronizing input caret position
     */
    let caretPosition = this.keyboard.caretPosition;
    if (caretPosition !== null)
      this.setInputCaretPosition(this.selectedInputElem, caretPosition);

    console.log("caretPosition", caretPosition);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
