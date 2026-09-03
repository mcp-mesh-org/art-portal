import ArtworkGrid from './components/ArtworkGrid';
import Cart from './components/Cart';
import { useCart } from './useCart';

export default function App() {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <main>
      <h1>Art Portal</h1>
      <ArtworkGrid onAddToCart={addToCart} />
      <Cart cart={cart} onRemove={removeFromCart} />
    </main>
  );
}
