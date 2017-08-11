'use babel';

export default class StatusView {

	constructor(status) {
		this.status = status;

		// Create root element
		this.element = document.createElement('div');
		this.element.classList.add('kevscript-status');
		this.element.classList.add('inline-block');

		// Create label element
		const label = document.createElement('span');
		label.textContent = `KevScript: `;
		label.classList.add('label');
		this.element.appendChild(label);

		this.statusEl = document.createElement('span');
		this.statusEl.textContent = this.status;
		this.statusEl.classList.add('status');
		this.element.appendChild(this.statusEl);
	}

	// Returns an object that can be retrieved when package is activated
	serialize() {
		return this.status;
	}

	// Tear down any state and detach
	destroy() {
		this.element.remove();
	}

	setStatus(status) {
		this.status = status;
		this.statusEl.textContent = this.status;
	}

	getElement() {
		return this.element;
	}

	hide() {
		this.element.classList.add('hide');
	}

	show() {
		this.element.classList.remove('hide');
	}
}
