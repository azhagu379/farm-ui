    import { NextResponse } from 'next/server';
    import { farmerProfiles } from '@/lib/placeholder-data';

    export async function GET() {
      // In a real app, you might filter for featured farmers.
      // For now, we return all of them.
      return NextResponse.json(farmerProfiles);
    }
    