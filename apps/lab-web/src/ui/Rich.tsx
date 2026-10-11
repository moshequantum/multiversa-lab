import { Fragment } from "react";

/**
 * Renders a dictionary string with two inline marks: `code` → mono code, *text* → ivory emphasis.
 * Keeps prose in src/i18n while the styling stays in the components.
 */
export function Rich({
  text,
  codeClassName = "font-mono text-[13px] text-ivory",
  emClassName = "text-ivory",
}: {
  text: string;
  codeClassName?: string;
  emClassName?: string;
}) {
  return (
    <>
      {text.split(/(`[^`]+`|\*[^*]+\*)/).map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          return (
            <code key={i} className={codeClassName}>
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 1) {
          return (
            <span key={i} className={emClassName}>
              {part.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
