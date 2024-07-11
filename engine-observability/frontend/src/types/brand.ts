import type { StaticImageData } from 'next/image';

export type Logo = {
  innerLink: string;
  imgSrc: StaticImageData;
  imgAlt: string;
  outterLink?: string;
};
