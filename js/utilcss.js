var getVariable = function(styles, propertyName) {
  return String(styles.getPropertyValue(propertyName)).trim();
};

var setDocumentVariable = function(propertyName, value) {
  document.documentElement.style.setProperty(propertyName, value);
};
