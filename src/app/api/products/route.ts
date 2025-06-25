    import { NextResponse, type NextRequest } from 'next/server';
    import { products } from '@/lib/placeholder-data';

    export async function GET(request: NextRequest) {
      const { searchParams } = new URL(request.url);
      const type = searchParams.get('type');
      const limit = Number(searchParams.get('limit')) || undefined;

      let filteredProducts = [...products];

      // Handle different query types
      if (type === 'new-arrivals') {
        // Sort by creation date, newest first
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (type === 'featured') {
        // For now, we'll just return the first few products as "featured"
        filteredProducts = filteredProducts.slice(0, 8);
      }
      
      if (limit) {
        filteredProducts = filteredProducts.slice(0, limit);
      }

      return NextResponse.json(filteredProducts);
    }
    