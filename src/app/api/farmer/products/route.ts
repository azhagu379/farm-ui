    import { NextResponse } from 'next/server';
    import { products } from '@/lib/placeholder-data'; // Our "database"

    // This function will simulate fetching products for the logged-in farmer
    export async function GET() {
        // We can add logic later to get farmerId from session
        const farmerProducts = products.filter(p => p.farmerId === 'farm_bob');
        return NextResponse.json(farmerProducts);
    }

    // NEW: This function handles creating a new product
    export async function POST(request: Request) {
      const body = await request.json();
      console.log('New product submission received:', body);

      const newProduct = {
        id: `prod_${Date.now()}`, // Create a unique ID
        ...body,
        status: 'PENDING_APPROVAL', // All new products must be approved
        farmerId: 'farm_bob', // In a real app, get this from the session
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add the new product to our in-memory "database"
      products.push(newProduct);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return new NextResponse(JSON.stringify(newProduct), { status: 201 });
    }
    