import * as React from "react";
import autosize from "autosize";

type Props = {
  onChange?: (v: string) => void;
  value: string;
  isFocused?: false | number;
  isSelected?: false | number;
  style?: React.CSSProperties;
};

const isRefReady = (
  ref: React.MutableRefObject<unknown>
): ref is React.MutableRefObject<HTMLTextAreaElement> => {
  return ref !== null && ref.current !== null;
};

const TextAreaComponent: React.ComponentType<Props> = (
  {
    value,
    onChange = () => {},
    isFocused = false,
    isSelected = false,
    style = {}
  },
  realRef: React.MutableRefObject<HTMLTextAreaElement | null>
) => {
  const ref = realRef; //React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (!isRefReady(ref)) return;
    autosize(ref.current);
  }, []);
  React.useEffect(() => {
    if (!isRefReady(ref)) return;
    autosize.update(ref.current);
  }, [value]);
  React.useEffect(() => {
    if (!isRefReady(ref)) return;
    if (isFocused === false) {
      ref.current.blur();
    } else {
      ref.current.focus();
    }
  }, [isFocused]);
  React.useEffect(() => {
    if (!isRefReady(ref)) return;
    if (isSelected !== false) {
      ref.current.setSelectionRange(0, value.length);
    }
  }, [isSelected]);

  return (
    <textarea
      aria-label={`Argument text`}
      ref={ref}
      onChange={ev => {
        onChange(ev.target.value);
      }}
      value={value}
      rows={1}
      style={style}
    />
  );
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  TextAreaComponent
);
