'use babel';

export default class TooltipView {

  constructor(message, x, y) {
    this.message = message;
    this.x = x;
    this.y = y;

    // Create root element
    this.element = document.createElement('span');
    this.element.classList.add('kevscript-tooltip');
    this.element.style = `left: ${x}px; top: ${y}px;`;
    this.element.textContent = message;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      message: this.message,
      x: this.x,
      y: this.y
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
