
/*
var PaperButton =  require('../paper-button/paper-button');
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
<div>HOLA main-app</div>
<paper-button  raised>Hello World!!!</paper-button>
<button is="paper-button" raised >Hello World!!!</button>

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
module.exports = MainApp;*/
