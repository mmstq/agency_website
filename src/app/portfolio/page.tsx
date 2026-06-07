import { Suspense } from 'react';
import PortfolioView from '@/components/showcase-variants/PortfolioView';

export default function PortfolioPage() {
    return (
        <Suspense fallback={null}>
            <PortfolioView />
        </Suspense>
    );
}
