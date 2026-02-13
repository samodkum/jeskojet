import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // 1. Insert into Supabase
        const { error: supabaseError } = await supabase
            .from('inquiries')
            .insert([{ name, email, subject, message }]);

        if (supabaseError) {
            console.error('Supabase Error:', supabaseError);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        // 2. Send to Google Sheets (if configured)
        const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

        if (googleSheetsUrl) {
            try {
                // Send standard JSON to the webhook
                const response = await fetch(googleSheetsUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message,
                        timestamp: new Date().toISOString()
                    }),
                });

                if (!response.ok) {
                    console.error('Webhook HTTP Error:', response.status, response.statusText);
                }
            } catch (webhookError) {
                console.error('Webhook Error:', webhookError);
                // We don't fail the request if webhook fails, as long as DB succeeded.
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
