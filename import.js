myElementTemplate('my-import').then(function(template) {
    document.registerElement('my-import', {
        prototype: Object.create(HTMLElement.prototype, {
            createdCallback: {
                value: function() {
                    this.appendChild(template.content.cloneNode(true));
                },
            },
        }),
    });
});
