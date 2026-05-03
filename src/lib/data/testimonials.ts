export interface Testimonial {
    id: string;
    content: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        content: "Modall didn't just build us a website; they built a technological asset. The speed and interactive fidelity are beyond anything we've seen in the B2B space.",
        author: "Sarah Chen",
        role: "CTO",
        company: "Nebula Pay",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    },
    {
        id: '2',
        content: "The level of engineering precision in their React builds is exceptional. Our conversion rate increased by 40% within the first month of launching the new platform.",
        author: "Marcus Thorne",
        role: "Head of Digital",
        company: "LogiFlow",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
    },
    {
        id: '3',
        content: "They operate like an extension of our internal engineering team. Highly technical, design-obsessed, and ruthlessly efficient.",
        author: "Elena Rodriguez",
        role: "Founder",
        company: "Vitalis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop",
    },
];
