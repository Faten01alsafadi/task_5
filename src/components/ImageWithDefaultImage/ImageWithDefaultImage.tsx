type Props = {
  src: string;
  alt?: string;
  className?: string;
};

function ImageWithDefaultImage({ src, alt, className }: Props) {
  const DefaultImage = "/assets/image 2.png";
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = DefaultImage;
      }}
    />
  );
}

export default ImageWithDefaultImage;
