import sanitizeHtml from 'sanitize-html';

export function sanitizeText(input) {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  });
}

export function sanitizeTransaction(tx) {
  return {
    ...tx,
    user: {
      ...tx.user,
      name: sanitizeText(tx.user.name)
    },
    items: tx.items.map(i => ({ ...i, description: sanitizeText(i.description) }))
  };
}
