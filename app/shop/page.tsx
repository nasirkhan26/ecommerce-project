type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: { count: number; rate: number };
};

export default async function ShopPage() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products: Product[] = await res.json();

    return (
        <div className="max-w-screen-2xl mx-auto px-10 mt-10">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            <div className="grid grid-cols-4 gap-6">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all flex flex-col"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-50 object-contain mb-4"
                        />
                        <h2 className="text-sm font-medium line-clamp-2 flex-1">{item.title}</h2>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-lg font-bold">${item.price}</span>
                            <span className="text-xs text-gray-400">⭐ {item.rating.rate} ({item.rating.count})</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}