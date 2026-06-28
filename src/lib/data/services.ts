import { Code2, Cpu, Globe2, ShieldCheck, Zap, Database, type LucideIcon } from 'lucide-react';

export interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: LucideIcon;
    features: string[];
}

export const services: Service[] = [
    {
        id: 'web-apps',
        title: 'Web Applications',
        slug: 'web-apps',
        description: 'Custom full-stack platforms built for scale, performance, and conversion.',
        icon: Globe2,
        features: ['React & Next.js Systems', 'High-Performance Architecture', 'Editorial UI/UX', 'SEO Hardening'],
    },
    {
        id: 'mobile',
        title: 'Mobile Solutions',
        slug: 'mobile',
        description: 'High-fidelity iOS and Android applications with native-grade performance.',
        icon: Zap,
        features: ['Cross-Platform Efficiency', 'Fluid Motion Design', 'Offline-First Logic', 'App Store Orchestration'],
    },
    {
        id: 'ai',
        title: 'AI Integration',
        slug: 'ai',
        description: 'Custom LLM orchestration and vector database infrastructure for enterprise.',
        icon: Cpu,
        features: ['RAG Pipeline Development', 'Agentic Workflows', 'Model Fine-tuning', 'Vector Search Implementation'],
    },
    {
        id: 'saas',
        title: 'SaaS Development',
        slug: 'saas',
        description: 'End-to-end product builds for high-growth ventures and enterprise monoliths.',
        icon: Code2,
        features: ['Multi-tenant Architecture', 'Subscription Infrastructure', 'Analytics Dashboards', 'API Orchestration'],
    },
    {
        id: 'infrastructure',
        title: 'Cloud Infrastructure',
        slug: 'infrastructure',
        description: 'Secure, scalable, and ruthlessly efficient cloud-native architectures.',
        icon: Database,
        features: ['Terraform & IaC', 'Edge Computing', 'Database Optimization', 'Continuous Delivery'],
    },
    {
        id: 'security',
        title: 'Security Auditing',
        slug: 'security',
        description: 'Deep technical audits and hardening for high-stakes digital assets.',
        icon: ShieldCheck,
        features: ['Penetration Testing', 'Code Audits', 'Compliance Hardening', 'Vulnerability Mapping'],
    },
];
