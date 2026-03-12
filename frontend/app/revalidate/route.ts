// frontend/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/haberler');
  revalidatePath('/haberler/[slug]', 'page');
  revalidatePath('/vakfimiz/yonetim-kurullari');

  return NextResponse.json({ revalidated: true });
}