class PaperButton extends HTMLElement {
	constructor(props){
		super();
		console.log(props);
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
				<style>@import "components/paper-button/paper-button.css";</style>
				<slot></slot>
		`;
		this.textContent = (props.hasOwnProperty("name"))?props.name: 'i am your father';
		this.addEventListener('click',()=>{
			alert("Hello World!!!!");
		});
	}
	connectedCallback() {}
	disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {}

}

customElements.define('paper-button',PaperButton);
customElements.whenDefined('paper-button').then(() => {
  console.log('registered paper-button...');
});
