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
  keyboard: Keyboard;
  inputName = "firstName";
  inputs = {
    firstName: "Boaty",
    lastName: "McBoatface"
  };

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      debug: true,
      inputName: this.inputName,
      onChange: (input) => this.onChange(input),
      onKeyPress: (button) => this.onKeyPress(button),
      preventMouseDownDefault: true // If you want to keep focus on input
    });

    /**
     * Since we have default values for our inputs,
     * we must sync them with simple-keyboard
     */
    this.keyboard.replaceInput(this.inputs);
  }

  onInputFocus = (event: any) => {
    this.inputName = event.target.id;

    console.log("Focused input", this.inputName);

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
    this.inputs[this.inputName] = input;
    console.log("Input changed", input);

    /**
     * Synchronizing input caret position
     */
    let caretPosition = this.keyboard.caretPosition;

    if (caretPosition !== null)
      this.setInputCaretPosition(
        document.querySelector(`#${this.inputName}`),
        caretPosition
      );

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
