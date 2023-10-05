import Style from "./index.module.css";

interface TransparentButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const TransparentButton: React.FC<TransparentButtonProps> = ({
  children,
  ...rest
}): JSX.Element => {
  // TODO: Why is there a type conflict? Is it a bug?
  return (
    <button className={Style.button} {...rest}>
      {children}
    </button>
  );
};

export default TransparentButton;
