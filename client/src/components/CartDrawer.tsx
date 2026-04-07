import { ShoppingCart, Plus, Minus, X, CreditCard } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = Array.isArray(cart) ? cart : [];
  const totalItems = getCartCount();
  const totalPrice = getCartTotal();

  const handleCheckout = () => {
    toast.success("Order placed successfully! We'll contact you shortly.", {
      duration: 4000,
    });
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <button className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-110 active:scale-95">
          <ShoppingCart className="h-6 w-6 text-primary-foreground" />
          {totalItems > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive p-0 text-xs text-destructive-foreground">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-[65vw] max-w-[65vw] flex-col sm:w-[45vw] sm:max-w-[45vw]">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">
            Your Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
	        ) : (
	          <>
	            <div className="flex-1 overflow-y-auto py-4">
	              {items.map((item: any, index: number) => {
                  const product = item?.product ?? item;
                  const productId = product?.id ?? item?.id ?? `item-${index}`;
                  const quantity = Number(item?.quantity) > 0 ? Number(item.quantity) : 1;

                  return (
	                <div key={productId} className="mb-4">
	                  <div className="flex gap-3">
	                    <img
	                      src={product?.image}
	                      alt={product?.name ?? "Cart product"}
	                      loading="lazy"
	                      decoding="async"
	                      className="h-20 w-20 rounded-lg object-cover"
	                    />
	                    <div className="flex flex-1 flex-col">
	                      <p className="text-xs text-muted-foreground">{item?.companyName ?? "Product"}</p>
	                      <p className="font-medium text-sm leading-tight">{product?.name ?? "Unnamed product"}</p>
	                      <div className="mt-2 flex items-center gap-2">
	                        <button
	                          onClick={() => updateQuantity(productId, quantity - 1)}
	                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted transition-colors hover:bg-accent"
	                        >
	                          <Minus className="h-3 w-3" />
	                        </button>
	                        <span className="w-6 text-center text-sm font-medium">{quantity}</span>
	                        <button
	                          onClick={() => updateQuantity(productId, quantity + 1)}
	                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted transition-colors hover:bg-accent"
	                        >
	                          <Plus className="h-3 w-3" />
	                        </button>
	                      </div>
	                    </div>
	                    <button
	                      onClick={() => removeFromCart(productId)}
	                      className="self-start p-1 text-muted-foreground hover:text-destructive"
	                    >
	                      <X className="h-4 w-4" />
	                    </button>
	                  </div>
	                  <Separator className="mt-4" />
	                </div>
                );
                })}
	            </div>

	            <div className="border-t border-border pt-4">
	              <div className="flex items-center justify-between mb-4">
	                <div>
	                  <span className="font-display text-lg font-semibold">Items in cart</span>
	                  <p className="text-xs text-muted-foreground">Total: {totalPrice.toFixed(2)}</p>
	                </div>
	                <span className="font-display text-2xl font-bold text-primary">{totalItems}</span>
	              </div>
	              <Button onClick={handleCheckout} className="w-full gap-2" size="lg">
	                <CreditCard className="h-5 w-5" />
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
