import images from '@/lib/generated-images.json';

/** Static, content-addressed image variants compatible with GitHub Pages. */
export default function PortfolioImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading,
  fetchPriority,
  ...props
}) {
  const image = images[src];
  const variants = image?.variants;
  const fallback = variants?.[variants.length - 1]?.src || src;
  return (
    <img
      {...props}
      src={fallback}
      srcSet={variants?.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={variants ? sizes : undefined}
      alt={alt}
      width={width ?? image?.width}
      height={height ?? image?.height}
      loading={loading ?? (fetchPriority === 'high' ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}
