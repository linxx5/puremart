import { useId, type FormHTMLAttributes } from 'react';
import { colors, fontSize } from '@puremart/tokens';

export interface SearchInputProps extends FormHTMLAttributes<HTMLFormElement> {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  name?: string;
}

export function SearchInput({ label, placeholder, defaultValue, name = 'q', ...rest }: SearchInputProps) {
  const id = useId();
  return (
    <form role="search" {...rest}>
      <label htmlFor={id} style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: 'relative', maxWidth: 420 }}>
        <span aria-hidden="true" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: colors.blue, fontWeight: 700 }}>
          ⌕
        </span>
        <input
          id={id}
          name={name}
          type="search"
          defaultValue={defaultValue}
          placeholder={placeholder}
          style={{
            width: '100%',
            fontFamily: 'inherit',
            fontSize: fontSize.body,
            padding: '12px 14px 12px 40px',
            border: `2px solid ${colors.blue}`,
            borderRadius: 999,
          }}
        />
      </div>
    </form>
  );
}
