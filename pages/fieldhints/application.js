Ajax.Responders.register({
  onComplete: function(ajaxRequest) {
    FieldHints.initialize();
  }
});
