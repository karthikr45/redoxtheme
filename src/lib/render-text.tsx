import React from "react";

/**
 * Renders text content that may be plain text or HTML (from rich text editor).
 * If the content contains HTML tags, renders with dangerouslySetInnerHTML.
 * Otherwise renders as plain text.
 */
export function RenderText({
  content,
  as: Tag = "span",
  className,
  ...rest
}: {
  content: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: unknown;
}) {
  if (!content) return null;

  // Check if content has HTML tags
  const hasHTML = /<[a-z][\s\S]*>/i.test(content);

  if (hasHTML) {
    // @ts-expect-error dynamic tag
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: content }} {...rest} />;
  }

  // @ts-expect-error dynamic tag
  return <Tag className={className} {...rest}>{content}</Tag>;
}
