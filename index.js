module.exports = () => ({ registerTemplateHelper }) => {

  registerTemplateHelper('activeLink', (metadata, href, title, attributes = {}) => {
    // if this link goes to the current page add the class "active"
    if ('/' + metadata.slug === href) {
      attributes.class = attributes.class ? attributes.class += ' active' : 'active';
    }
    // construct and return the link
    const output = [`<a href="${href}"`];
    for (attribute in attributes) {
      output.push(` ${attribute}="${attributes[attribute]}"`);
    }
    output.push(`>${title}</a>`);
    return output.join('');
  });

}
