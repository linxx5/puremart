import { useId, type InputHTMLAttributes } from 'react';
import { colors, fontSize } from '@puremart/tokens';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextInput({ label, hint, error, id, ...rest }: TextInputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hintId = `${fieldId}-hint`;
  const describedBy = hint || error ? hintId : undefined;
  return (
    <div style={{ marginBottom: 16, maxWidth: 420 }}>
      <label htmlFor={fieldId} style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
        {label}
      </label>
      <input
        id={fieldId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        style={{
          width: '100%',
          fontFamily: 'inherit',
          fontSize: fontSize.body,
          padding: '12px 14px',
          color: colors.ink,
          background: colors.white,
          border: `2px solid ${error ? colors.red : colors.mist}`,
          borderRadius: 10,
        }}
        {...rest}
      />
      {error ? (
        <div id={hintId} role="alert" style={{ fontSize: 12, color: colors.red, marginTop: 4 }}>
          {error}
        </div>
      ) : hint ? (
        <div id={hintId} style={{ fontSize: 12, color: colors.slate, marginTop: 4 }}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}
