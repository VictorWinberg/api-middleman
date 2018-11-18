define(["globals"], globals => {
  const request = (url, options = {}) =>
    fetch(globals.SERVER, {
      ...options,
      method: "POST",
      headers: {
        ...options.headers,
        Url: url,
        Method: options.method || "GET",
        Username: globals.USERNAME
      }
    });

  const response = (title, body) => {
    const structure = [
      [
        "tr",
        [
          [
            "td",
            [["a", title], ["br"], ["span", { class: "light", text: body }]]
          ]
        ]
      ]
    ];
    build(globals.ROOT, structure);
  };

  const build = (root, array) =>
    array.forEach(([element, node]) => {
      const el = document.createElement(element);
      if (typeof node === "string" || typeof node === "number") {
        const text = document.createTextNode(node);
        el.appendChild(text);
      } else if (Array.isArray(node)) {
        build(el, node);
      } else if (typeof node === "object") {
        Object.entries(node).forEach(([key, value]) => {
          el.setAttribute(key, value);
          if (key === "text") {
            el.appendChild(document.createTextNode(value));
          }
        });
      }
      root.appendChild(el);
    });

  return { request, response };
});
