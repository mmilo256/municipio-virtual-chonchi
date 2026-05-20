import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

const PruebaMK = () => {
  const markdown = `

  `;

  return (
    <div>
      <Markdown
        components={{ h1: ({ children }) => <h1 className="text-3xl">{children}</h1> }}
        remarkPlugins={remarkGfm}
        rehypePlugins={rehypeSanitize}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default PruebaMK;
