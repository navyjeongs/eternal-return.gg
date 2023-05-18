import { HTMLAttributes, InputHTMLAttributes } from "react";
import styled from "styled-components";

const Input = styled.input<InputProps>`
  border: ${(props) => (props.border ? `${props.border} solid var(--color__txt)` : "none")};

  border-radius: 0.5rem;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  outline: none;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  border?: string;
}

const CommonInput = ({ onChange, value, border, ...props }: InputProps) => {
  return (
    <Input
      onChange={onChange}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      width={props.width}
      height={props.height}
      border={border}
    />
  );
};

export default CommonInput;
