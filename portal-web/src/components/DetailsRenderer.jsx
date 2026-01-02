const DetailsRenderer = ({ blocks }) => {
  if (!Array.isArray(blocks)) return null;

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return (
              <p key={index} className="text-gray-700 leading-relaxed">
                {block.content}
              </p>
            );

          case 'list':
            return (
              <ul key={index} className="list-disc pl-6 space-y-2">
                {block.items?.map((item, itemIndex) => {
                  switch (item.type) {
                    case 'text':
                      return (
                        <li key={itemIndex} className="text-gray-700">
                          {item.content}
                        </li>
                      );

                    case 'link':
                      return (
                        <li key={itemIndex}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {item.content}
                          </a>
                        </li>
                      );

                    default:
                      return null;
                  }
                })}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default DetailsRenderer;
