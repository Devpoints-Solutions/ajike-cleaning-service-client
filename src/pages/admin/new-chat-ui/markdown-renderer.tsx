import { marked } from "marked";
import { useMemo } from "react";
import { Interweave } from "interweave";
import { transform } from "./transform";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderedContent = useMemo(
    () =>
      content
        ? marked.parse(content, {
            gfm: true,
            breaks: true,
          })
        : "",
    [content],
  );

  return (
    <div className="prose prose-neutral max-w-none prose-p:my-2 prose-p:leading-relaxed prose-headings:mt-4 prose-headings:mb-2 prose-headings:font-semibold prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none">
      <Interweave content={renderedContent as string} transform={transform} />
    </div>
  );
}
