const basePath = '/foreign-domestic-helper-under-12';

export default function imageLoader({ src }: { src: string }) {
  if (src.startsWith('/') && !src.startsWith(basePath)) {
    return `${basePath}${src}`;
  }
  return src;
}
