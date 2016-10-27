(function () {
	var template = '<div class="container"></div>';
	class PaperButton extends HTMLElement{
		constructor(props){
			super();
			this.props = props;
		}
		createdCallback() {
			this.createShadowRoot().innerHTML = template;
			this.$container = this.shadowRoot.querySelector('.container');
			this.$container.innerHTML=this.props.name;
		}
	}
	//window.PaperButtonElement = PaperButton;
	window.PaperButton = document.registerElement('paper-button', PaperButton);
})();
