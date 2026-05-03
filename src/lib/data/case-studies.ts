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
    featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
    {
        id: '1',
        title: 'Architecting the Future of Global FinTech',
        client: 'Nebula Pay',
        category: 'Infrastucture',
        description: 'Building a high-performance payment engine capable of processing 10k transactions per second with sub-50ms latency.',
        metric: '99.99%',
        metricLabel: 'Uptime achieved',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop',
        href: '/portfolio/nebula-pay',
        featured: true,
    },
    {
        id: '2',
        title: 'Scaling AI-Powered Supply Chain Logistics',
        client: 'LogiFlow',
        category: 'AI Integration',
        description: 'Implementing a custom LLM orchestration layer to automate multi-modal logistics routing across 4 continents.',
        metric: '42%',
        metricLabel: 'Ops efficiency lift',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop',
        href: '/portfolio/logiflow',
        featured: true,
    },
    {
        id: '3',
        title: 'A New Standard for Digital Health Records',
        client: 'Vitalis',
        category: 'HealthTech',
        description: 'A secure, HIPAA-compliant patient management system with real-time biometric synchronization.',
        metric: '1.2s',
        metricLabel: 'Data retrieval speed',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop',
        href: '/portfolio/vitalis',
        featured: true,
    },
];
