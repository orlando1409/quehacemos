
var PaperButton =  require('../paper-button/paper-button');
var PaperFab =  require('../paper-fab/paper-fab');
var PaperIcon =  require('../paper-icon/paper-icon');

var template = `
<custom-style>
<style>
	:host {
	    display:flex;
	    font-size: 14px;
	    margin: 0;
	    padding: 24px;
	    background-color: var(--paper-grey-50);
	    color: var(--paper-grey-700);
	    @apply --paper-font-common-base;
		@apply --shadow-elevation-2dp;
	}
</style>
</custom-style>
<div>
<paper-button color="red" href="http://google.com"><paper-icon icon="face"></paper-icon> Hi Edinson</paper-button>
<paper-button raised color="green"><paper-icon icon="build"></paper-icon><span>I am your father...</span></paper-button>
<paper-button raised disabled></paper-button>
<paper-fab icon="build"></paper-fab>
<paper-fab icon="build" color="blue" raised></paper-fab>
<slot></slot>
</div>
`;
class MainApp extends HTMLElement {
	constructor(){
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML =template;
	}

	connectedCallback() {}
	disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {}


}

customElements.define('main-app',MainApp);
customElements.whenDefined('main-app').then(() => {
	console.log('registered main-app');
});
module.exports = MainApp;
