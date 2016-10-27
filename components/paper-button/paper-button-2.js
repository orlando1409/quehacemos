class PaperButton2 extends HTMLElement {
	constructor(){
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
				<link rel="stylesheet" href="css/typography.css" type="text/css">
				<style>
				:host {
				        @apply --layout-inline;
				        @apply --layout-center-center;
				        position: relative;
				        box-sizing: border-box;
				        min-width: 5.14em;
				        margin: 0 0.29em;
				        background: red;
				        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				        -webkit-tap-highlight-color: transparent;
				        font: inherit;
				        text-transform: uppercase;
				        outline-width: 0;
				        border-radius: 3px;
				        -moz-user-select: none;
				        -ms-user-select: none;
				        -webkit-user-select: none;
				        user-select: none;
				        cursor: pointer;
				        z-index: 0;
				        padding: 0.7em 0.57em;
				        @apply --paper-font-common-base;
				        @apply --paper-button;
				      }
				      :host([hidden]) {
				        display: none !important;
				      }
				      :host([raised].keyboard-focus) {
				        font-weight: bold;
				        @apply --paper-button-raised-keyboard-focus;
				      }
				      :host(:not([raised]).keyboard-focus) {
				        font-weight: bold;
				        @apply --paper-button-flat-keyboard-focus;
				      }
				      :host([disabled]) {
				        background: #eaeaea;
				        color: #a8a8a8;
				        cursor: auto;
				        pointer-events: none;
				        @apply --paper-button-disabled;
				      }
				      :host([animated]) {
				        @apply --shadow-transition;
				      }
				      paper-ripple {
				        color: var(--paper-button-ink-color);
				      }
                </style>
				<slot></slot>
		`;
		this.addEventListener('click',()=>{
			console.log("Hello World!!!!");
		});
	}
	connectedCallback() {}
	disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {}
    get name(){
        return this.name;
    }
    set name(value){
        this.name = value;
        this.textContent = value;
    }

}

customElements.define('paper-button-2',PaperButton2);
customElements.whenDefined('paper-button-2').then(() => {
  console.log('registered paper-button-2...');
});
