import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export const transform = (
  node: HTMLElement,
  _children: React.ReactNode[],
): React.ReactNode | undefined => {
  // Interweave provides HTML tag names in uppercase.
  if (node.tagName !== "PRE") {
    return undefined;
  }

  const codeElement = node.querySelector(":scope > code");

  if (!codeElement) {
    return undefined;
  }

  const code = codeElement.textContent ?? "";

  return (
    <SyntaxHighlighter
      style={oneLight}
      wrapLongLines
      PreTag="div"
      customStyle={{
        margin: 0,
        borderRadius: "0.75rem",
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--card))",
        fontSize: "0.85rem",
        lineHeight: "1.6",
        boxShadow: "0 12px 24px rgba(18, 37, 96, 0.04)",
      }}
      codeTagProps={{
        style: {
          fontFamily:
            '"Fira Code", "Cascadia Code", Consolas, Monaco, monospace',
          color: "hsl(var(--foreground))",
        },
      }}
    >
      {code.replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};
