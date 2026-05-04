import { StaticImageData } from 'next/image';

export interface Project {
  id: string;
  title: string;
  logo: StaticImageData;
  description: string;
  tech: string[];
  link: string;
  screenshots: number;
  screenshotExt: string;
  iosLink: string;
  screenshotPaths: StaticImageData[];
}
