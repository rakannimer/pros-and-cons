import * as React from "react";
import autosize from "autosize";

export const TextArea: React.ComponentType<{
  onChange?: (v: string) => void;
  value: string;
}> = ({ value, onChange = () => {} }) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (textAreaRef.current === null) return;
    if (value === "") {
      textAreaRef.current.focus();
    }
    autosize(textAreaRef.current);
  }, []);
  return (
    <textarea
      ref={ref => (textAreaRef.current = ref)}
      onChange={ev => {
        onChange(ev.target.value);
      }}
      value={value}
      rows={1}
    />
  );
};
