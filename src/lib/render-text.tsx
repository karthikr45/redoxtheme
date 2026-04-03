import React from "react";

/**
 * Renders text content that may be plain text or HTML (from rich text editor).
 */
export function RenderText({
  content,
  as: Tag = "span",
  className,
  ...rest
}: {
  content: string;
  as?: React.ElementType;
  className?: string;
  [key: string]: unknown;
}) {
  if (!content) return null;

  const hasHTML = /<[a-z][\s\S]*>/i.test(content);

  if (hasHTML) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: content }} {...rest} />;
  }

  return <Tag className={className} {...rest}>{content}</Tag>;
}
