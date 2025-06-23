import { CartContents } from "./_components/cart-content";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Your Shopping Cart</h1>
      <div className="mt-8">
        <CartContents />
      </div>
    </div>
  );
}
