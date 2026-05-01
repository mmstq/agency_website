import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        // In production, integrate with your email service provider here:
        // e.g., Mailchimp, SendGrid, ConvertKit, etc.
        // For now, we log and return success.
        console.log('[Newsletter] New signup:', email);

        // Simulate a small delay for realism
        await new Promise(resolve => setTimeout(resolve, 300));

        return NextResponse.json(
            { success: true, message: 'You\'re on the list. We\'ll be in touch.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('[Newsletter] Error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        );
    }
}
