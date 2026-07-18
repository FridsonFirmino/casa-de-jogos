declare module "*.jpeg" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.jpg" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.png" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.gif" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.webp" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
