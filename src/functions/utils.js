// Open New Page
export const OpenNewPage = (href) => {
  window.open(href, "_blank");
};

// Text parser | Similar to markdown parser
export const parser = (text) => {
  // Regex for links
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const link = text.match(linkRegex);
  if (link) {
    link.forEach((match) => {
      const [name, href] = match.replace("[", "").replace(")", "").split("](");
      text = text.replace(match, `<a href="${href}" target="_blank" class="hover:underline">${name}</a>`);
    });
  }
  return text;
};
