import * as React from "react";
import autosize from "autosize";

const TextAreaComponent: React.ComponentType<{
  onChange?: (v: string) => void;
  value: string;
  isFocused?: false | number;
  isSelected?: false | number;
  style?: React.CSSProperties;
}> = (
  {
    value,
    onChange = () => {},
    isFocused = false,
    isSelected = false,
    style = {}
  },
  ref
) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (textAreaRef.current === null) return;
    autosize(textAreaRef.current);
  }, []);
  React.useEffect(() => {
    if (textAreaRef.current === null) return;
    autosize.update(textAreaRef.current);
  }, [value]);
  React.useEffect(() => {
    if (textAreaRef.current === null) return;
    if (isFocused === false) {
      textAreaRef.current.blur();
    } else {
      textAreaRef.current.focus();
    }
  }, [isFocused]);
  React.useEffect(() => {
    if (textAreaRef.current === null) return;
    if (isSelected !== false) {
      textAreaRef.current.setSelectionRange(0, value.length);
    }
  }, [isSelected]);

  return (
    <textarea
      ref={textAreaRef}
      onChange={ev => {
        onChange(ev.target.value);
      }}
      value={value}
      rows={1}
      style={style}
    />
  );
};

export const TextArea = React.forwardRef(TextAreaComponent);
