import React from 'react';

interface TiptapContent {
  type: string;
  content?: TiptapContent[];
  text?: string;
  attrs?: Record<string, any>;
  marks?: { type: string; [key: string]: any }[];
}

interface TiptapDocument {
  type: 'doc';
  content: TiptapContent[];
}

interface JobDescriptionRendererProps {
  description: string | TiptapDocument;
  className?: string;
}

const JobDescriptionRenderer: React.FC<JobDescriptionRendererProps> = ({
  description,
  className = ""
}) => {
  // Helper function to parse JSON string if needed
  const parseDescription = (desc: string | TiptapDocument): TiptapDocument | null => {
    if (typeof desc === 'string') {
      // First check if it looks like JSON (starts with { or [)
      const trimmed = desc.trim();
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          return JSON.parse(desc) as TiptapDocument;
        } catch (error) {
          console.error('Failed to parse job description JSON:', error);
          return null;
        }
      }
      // Plain text, not JSON - return null to trigger fallback
      return null;
    }
    return desc;
  };

  // Helper function to check if string contains HTML tags
  const containsHTML = (str: string): boolean => {
    return /<\/?[a-z][\s\S]*>/i.test(str);
  };

  // Helper function to parse HTML and convert to React elements
  const parseHTML = (html: string): React.ReactNode => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const parseNode = (node: ChildNode, key: number): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        return text ? text : null;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();
        const children = Array.from(element.childNodes).map((child, idx) =>
          parseNode(child, idx)
        ).filter(Boolean);

        switch (tagName) {
          case 'p':
            return (
              <p key={key} className="mb-4 text-gray-300 leading-relaxed">
                {children}
              </p>
            );
          case 'strong':
          case 'b':
            return (
              <strong key={key} className="font-semibold text-white">
                {children}
              </strong>
            );
          case 'em':
          case 'i':
            return <em key={key} className="italic">{children}</em>;
          case 'u':
            return <u key={key}>{children}</u>;
          case 'ul':
            return (
              <ul key={key} className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
                {children}
              </ul>
            );
          case 'ol':
            return (
              <ol key={key} className="list-decimal pl-6 mb-4 space-y-2 text-gray-300">
                {children}
              </ol>
            );
          case 'li':
            return (
              <li key={key} className="mb-2 leading-relaxed">
                {children}
              </li>
            );
          case 'h1':
            return (
              <h1 key={key} className="text-2xl font-bold mb-4 mt-6 text-white">
                {children}
              </h1>
            );
          case 'h2':
            return (
              <h2 key={key} className="text-xl font-semibold mb-3 mt-5 text-white">
                {children}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={key} className="text-lg font-semibold mb-3 mt-4 text-white">
                {children}
              </h3>
            );
          case 'br':
            return <br key={key} />;
          case 'hr':
            return <hr key={key} className="my-4 border-gray-600" />;
          case 'blockquote':
            return (
              <blockquote key={key} className="border-l-4 border-indigo-400 pl-4 my-4 italic text-gray-300">
                {children}
              </blockquote>
            );
          case 'code':
            return (
              <code key={key} className="bg-gray-800 px-2 py-1 rounded text-sm text-gray-300">
                {children}
              </code>
            );
          case 'pre':
            return (
              <pre key={key} className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
                {children}
              </pre>
            );
          case 'a':
            return (
              <a
                key={key}
                href={element.getAttribute('href') || '#'}
                className="text-indigo-400 hover:text-indigo-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          default:
            // For unknown tags, just return children
            return <React.Fragment key={key}>{children}</React.Fragment>;
        }
      }

      return null;
    };

    const result = Array.from(tempDiv.childNodes).map((child, idx) =>
      parseNode(child, idx)
    ).filter(Boolean);

    return <>{result}</>;
  };

  // Helper function to convert plain text to structured format
  const convertPlainTextToStructured = (text: string): React.ReactNode => {
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      // Check if line starts with bullet point markers
      if (trimmedLine.match(/^[-•*]\s/)) {
        return (
          <li key={index} className="mb-2 leading-relaxed text-gray-300">
            {trimmedLine.replace(/^[-•*]\s/, '')}
          </li>
        );
      }

      // Check if line starts with number (e.g., "1.", "2.")
      if (trimmedLine.match(/^\d+\.\s/)) {
        return (
          <li key={index} className="mb-2 leading-relaxed text-gray-300">
            {trimmedLine.replace(/^\d+\.\s/, '')}
          </li>
        );
      }

      // Check if line looks like a heading (all caps or ends with colon)
      if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 50 && trimmedLine.length > 0) {
        return (
          <h3 key={index} className="text-lg font-semibold mb-3 mt-4 text-white">
            {trimmedLine}
          </h3>
        );
      }

      if (trimmedLine.endsWith(':') && trimmedLine.length < 50) {
        return (
          <h3 key={index} className="text-lg font-semibold mb-3 mt-4 text-white">
            {trimmedLine}
          </h3>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-4 text-gray-300 leading-relaxed">
          {trimmedLine}
        </p>
      );
    });
  };

  // Recursive function to render TipTap content
  const renderContent = (content: TiptapContent[], isInsideListItem = false): React.ReactNode => {
    return content.map((node, index) => {
      switch (node.type) {
        case 'paragraph': {
          // Adjust paragraph styling when inside list items
          const paragraphClass = isInsideListItem
            ? "text-gray-300 leading-relaxed"
            : "mb-4 text-gray-300 leading-relaxed";

          return (
            <p key={index} className={paragraphClass}>
              {node.content ? renderContent(node.content, isInsideListItem) : ''}
            </p>
          );
        }
        case 'heading': {
          const level = node.attrs?.level || 2;
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          const headingClasses = {
            1: "text-2xl font-bold mb-4 text-white",
            2: "text-xl font-semibold mb-3 text-white",
            3: "text-lg font-medium mb-2 text-white"
          };

          return React.createElement(
            HeadingTag,
            {
              key: index,
              className: headingClasses[level as keyof typeof headingClasses] || headingClasses[2]
            },
            node.content ? renderContent(node.content, isInsideListItem) : ''
          );
        }
        case 'bulletList': {
          return (
            <ul key={index} className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
              {node.content ? renderContent(node.content, false) : ''}
            </ul>
          );
        }
        case 'orderedList': {
          return (
            <ol key={index} className="list-decimal pl-6 mb-4 text-gray-300 space-y-2">
              {node.content ? renderContent(node.content, false) : ''}
            </ol>
          );
        }
        case 'listItem': {
          return (
            <li key={index} className="mb-2 leading-relaxed">
              <div className="pl-0">
                {node.content ? renderContent(node.content, true) : ''}
              </div>
            </li>
          );
        }
        case 'text':
          { let textElement: React.ReactNode = node.text || '';

          // Handle text marks/formatting
          if (node.marks) {
            node.marks.forEach((mark: any) => {
              switch (mark.type) {
                case 'bold':
                  textElement = <strong key={`bold-${index}`} className="font-semibold">{textElement}</strong>;
                  break;
                case 'italic':
                  textElement = <em key={`italic-${index}`} className="italic">{textElement}</em>;
                  break;
                case 'underline':
                  textElement = <u key={`underline-${index}`}>{textElement}</u>;
                  break;
              }
            });
          }

          return textElement; }

        case 'hardBreak':
          return <br key={index} />;

        case 'blockquote': {
          return (
            <blockquote key={index} className="border-l-4 border-indigo-400 pl-4 my-4 italic text-gray-300">
              {node.content ? renderContent(node.content, isInsideListItem) : ''}
            </blockquote>
          );
        }
        case 'codeBlock': {
          return (
            <pre key={index} className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {node.content ? renderContent(node.content, isInsideListItem) : ''}
              </code>
            </pre>
          );
        }
        default:
          // Fallback for unknown node types
          console.warn(`Unknown node type: ${node.type}`);
          return node.content ? renderContent(node.content, isInsideListItem) : null;
      }
    });
  };

  const parsedDescription = parseDescription(description);

  if (!parsedDescription) {
    // Fallback for plain text - convert to structured format
    if (typeof description === 'string') {
      // Check if the description contains HTML tags
      if (containsHTML(description)) {
        return (
          <div className={className}>
            {parseHTML(description)}
          </div>
        );
      }

      const structuredContent = convertPlainTextToStructured(description);

      // Check if we have bullet points
      const hasBullets = description.includes('-') || description.includes('•') || description.includes('*') || /^\d+\.\s/m.test(description);

      if (hasBullets) {
        // Group consecutive list items together
        const elements: React.ReactNode[] = [];
        let currentList: React.ReactElement[] = [];
        let isOrderedList = false;

        React.Children.forEach(structuredContent, (child) => {
          if (React.isValidElement(child) && child.type === 'li') {
            currentList.push(child);
            // Check if the original line starts with number to determine list type
            const childIndex = child.key as string;
            const lineIndex = parseInt(childIndex);
            const line = description.split('\n')[lineIndex];
            if (line && line.trim().match(/^\d+\.\s/)) {
              isOrderedList = true;
            }
          } else {
            if (currentList.length > 0) {
              // Flush current list
              const ListTag = isOrderedList ? 'ol' : 'ul';
              const listClass = isOrderedList ? 'list-decimal' : 'list-disc';
              elements.push(
                <ListTag key={`list-${elements.length}`} className={`${listClass} pl-6 mb-4 space-y-2`}>
                  {currentList}
                </ListTag>
              );
              currentList = [];
              isOrderedList = false;
            }
            elements.push(child);
          }
        });

        // Flush remaining list
        if (currentList.length > 0) {
          const ListTag = isOrderedList ? 'ol' : 'ul';
          const listClass = isOrderedList ? 'list-decimal' : 'list-disc';
          elements.push(
            <ListTag key={`list-${elements.length}`} className={`${listClass} pl-6 mb-4 space-y-2`}>
              {currentList}
            </ListTag>
          );
        }

        return <div className={className}>{elements}</div>;
      }

      return <div className={className}>{structuredContent}</div>;
    }

    return (
      <div className={className}>
        <p className="text-gray-300 leading-relaxed">No description available</p>
      </div>
    );
  }

  return (
    <div className={`job-description ${className}`}>
      {parsedDescription.content ? renderContent(parsedDescription.content, false) : (
        <p className="text-gray-300">No description available</p>
      )}
    </div>
  );
};

export default JobDescriptionRenderer;
