const { format } = require('date-fns');



const renderAttributes = (attributes) => {
  const output = [];
  for (attribute in attributes) {
    output.push(` ${attribute}="${attributes[attribute]}"`);
  }
  return output.join('');
}



module.exports = () => ({ registerTemplateHelper }) => {


  registerTemplateHelper('activeLink', (metadata, href, title, attributes = {}, wrapper) => {
    // if this link goes to the current page add the class "active"
    if ('/' + metadata.slug === href) {
      attributes.class = attributes.class ? attributes.class += ' active' : 'active';
    }
    // if this page is a child of the link add the class "parent"
    if (('/' + metadata.slug).startsWith(href)) {
      attributes.class = attributes.class ? attributes.class += ' parent' : 'parent';
    }
    // construct and return the link
    const output = [];
    if (wrapper) {
      output.push(`<${wrapper}`);
      output.push(renderAttributes(attributes));
      output.push(`><a href="${href}">`);
    } else {
      output.push(`<a href="${href}"`);
      output.push(renderAttributes(attributes));
      output.push('>');
    }
    output.push(title);
    if (wrapper) {
      output.push(`</a></${wrapper}>`);
    } else {
      output.push('</a>');
    }
    return output.join('');
  });


  registerTemplateHelper('formatDate', (metadata, date, dateFormat, options = {}) => format(date, dateFormat, options));


}
