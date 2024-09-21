import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface SanityContentProps {
  content: any[];
}

export const SanityContent: React.FC<SanityContentProps> = ({ content }) => {
  const components = {
    types: {
      block: ({ value }: { value: any }) => (
        <ReactMarkdown>{value.children[0].text}</ReactMarkdown>
      ),
      image: ({ value }: { value: any }) => (
        <Image
          src={value.asset.url}
          alt={value.alt || ''}
          width={value.asset.metadata.dimensions.width}
          height={value.asset.metadata.dimensions.height}
        />
      ),
    },
  };

  return <PortableText value={content} components={components} />;
};
