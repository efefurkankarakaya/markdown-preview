import Style from "./index.module.css";

interface TransparentButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const TransparentButton: React.FC<TransparentButtonProps> = ({
  children,
  ...rest
}): JSX.Element => {
  return (
    /**
     * Type 'string | undefined' is not assignable to type '"button" | "submit" | "reset" | undefined'.
     * Type 'string' is not assignable to type '"button" | "submit" | "reset" | undefined'.
     * The root cause is, one has its type as "string" or "string | undefined", and the other one has a specific TButtonType value.
     * It's ignorable.
     */
    /* @ts-ignore */
    <button className={Style.button} {...rest}>
      {children}
    </button>
  );
};

export default TransparentButton;
