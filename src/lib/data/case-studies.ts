import { projects } from './projects';
import { StaticImageData } from 'next/image';

export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    category: string;
    description: string;
    metric: string;
    metricLabel: string;
    image: string;
    href: string;
    screenshots: StaticImageData[];
    featured?: boolean;
}

export const caseStudies: CaseStudy[] = projects.map(p => ({
    id: p.id,
    title: p.title,
    client: p.title,
    category: p.tech[0],
    description: p.description,
    metric: p.id === 'koor' ? '10K+' : (p.id === 'ssc_ai' ? 'AI' : 'Live'),
    metricLabel: p.id === 'koor' ? 'Downloads' : (p.id === 'ssc_ai' ? 'Powered' : 'Bidding'),
    image: p.screenshotPaths[0].src,
    screenshots: p.screenshotPaths,
    href: `/portfolio#${p.id}`,
    featured: true
}));
