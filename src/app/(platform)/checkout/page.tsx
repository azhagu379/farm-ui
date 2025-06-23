import { CheckoutForm } from './_components/checkout-form';
import { OrderSummary } from './_components/order-summary';

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
        {/* The main content area for forms */}
        <div className="flex flex-col gap-8">
          <CheckoutForm />
        </div>

        {/* The order summary, which will be sticky */}
        <div className="relative">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
