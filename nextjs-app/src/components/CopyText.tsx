import { useEffect, useRef, useState } from "react";

// Shows a piece of text (an email address, say) with a button that copies it.
// If the browser refuses clipboard access, the text is selected instead so
// it can be copied by hand.
const CopyText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const selectText = () => {
    const node = textRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      selectText();
    }
  };

  return (
    <span className={`inline-flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <span ref={textRef} className="select-all">
        {text}
      </span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:text-amber-500 hover:ring-amber-500"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="h-4 w-4">
          {copied ? (
            <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <rect x="7" y="7" width="9" height="9" rx="1.5" />
              <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" />
            </>
          )}
        </svg>
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${text} copied to clipboard` : ""}
      </span>
    </span>
  );
};

export default CopyText;
