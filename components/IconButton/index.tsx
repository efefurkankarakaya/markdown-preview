import Image from "next/image";
import TransparentButton from "../TransparentButton";

interface IconButtonProps {
  buttonProps: React.HTMLProps<HTMLButtonElement>;
  imageProps: any /* Type mismatch with Next/Image */;
}

const IconButton: React.FC<IconButtonProps> = ({ buttonProps, imageProps }): JSX.Element => {
  return (
    <TransparentButton {...buttonProps}>
      {/* @ts-ignore */}
      <Image priority {...imageProps} />
    </TransparentButton>
  );
};

export default IconButton;
