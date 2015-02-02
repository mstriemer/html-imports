var myElementTemplateResolvers = new Map();
var myElementTemplates = new Map();
function myElementTemplate(name) {
    var templatePromise = myElementTemplates.get(name);
    if (templatePromise === undefined) {
        templatePromise = new Promise(function(resolve, reject) {
            myElementTemplateResolvers.set(name, resolve);
        });
        myElementTemplates.set(name, templatePromise);
    }
    return templatePromise;
}

document.registerElement('my-element', {
    prototype: Object.create(HTMLElement.prototype, {
        createdCallback: {
            value: function() {
                var name = this.getAttribute('name');
                var template = this.querySelector('template');
                // Ensure the promise exists.
                myElementTemplate(name);
                myElementTemplateResolvers.get(name)(template);
            },
        },
    }),
});
