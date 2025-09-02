import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../app/hooks.ts";
import {ProductT} from "../utils/types.ts";
import {baseUrlBlog} from "../utils/constants.ts";
import {deletePost} from "../features/api/postActions.tsx";

const Products = () => {
    const token = useAppSelector(state => state.token);
    const nav = useNavigate();

    const [products, setProducts] = useState<ProductT[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openRow, setOpenRow] = useState<string | null>(null);


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const res = await fetch(`${baseUrlBlog}/posts`);
                if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
                const data: ProductT[] = await res.json();
                setProducts(data);
            } catch (e: unknown) {
                if (e instanceof Error) setError(e.message);
                else setError("Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (prodId: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await deletePost(prodId, token);
            setProducts(prev => prev.filter(p => p.id !== prodId));
        } catch (e: unknown) {
            alert("Error deleting product: " + (e instanceof Error ? e.message : "Unknown error"));
        }
    };

    if (loading)
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"/>
                <div className="mt-2">Loading products...</div>
            </div>
        );

    if (error)
        return (
            <div className="alert alert-danger text-center my-4" role="alert">
                Error: {error}
            </div>
        );

    return (
        <table className="table table-responsive table-hover align-middle">
            <thead className="table-light">
            <tr>
                <th scope="col"></th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>

            <tbody>
            {products.map(prod => (
                <>
                    <tr key={prod.id}>
                        {/* Toggler button */}
                        <td>
                            <button
                                className="btn btn-sm "
                                onClick={() => setOpenRow(openRow === prod.id ? null : prod.id)}
                            >
                                <i className={`fa ${openRow === prod.id ? "fa-chevron-up" : "fa-chevron-down"}`}/>
                            </button>
                        </td>

                        <td>
                            <img
                                height={70}
                                width={70}
                                className="object-fit-cover rounded border"
                                src={Array.isArray(prod.imageUrls) ? prod.imageUrls[0] : prod.imageUrls}
                                alt={prod.name}
                                onError={(e: any) => {
                                    e.target.src = "https://via.placeholder.com/70";
                                }}
                            />
                        </td>
                        <td>{prod.name}</td>
                        <td>
                            <span className="badge bg-secondary">{prod.category}</span>
                        </td>
                        <td>{prod.quantity}</td>
                        <td>₪ {prod.price.toFixed(2)}</td>
                        <td>
                            <button
                                className="fa fa-edit fa-lg me-2 p-0 border-0 text-primary"
                                onClick={() => nav(`/product/edit/${prod.id}`)}
                            />
                            <button
                                className="fa fa-trash fa-lg me-2 p-0 border-0 text-danger"
                                onClick={() => prod.id && handleDelete(prod.id)}
                            />
                        </td>
                    </tr>

                    {/* Expanded Row */}
                    {openRow === prod.id && (
                        <td colSpan={7}>
                            <div
                                className="bg-light p-3 rounded shadow-sm d-flex flex-wrap gap-5  justify-content-around">
                                <p><strong>ID:</strong> {prod.id}</p>

                                <p><strong>Created:</strong> {new Date(prod.dateCreated!).toLocaleDateString()}
                                </p>
                                <p><strong>Stock:</strong> {prod.quantity}</p>

                                <p><strong>Weight:</strong> {prod.weight}</p>
                                <p><strong>Size:</strong> {prod.size}</p>
                                <p><strong>Color:</strong> {prod.color}</p>
                                <p><strong>Material:</strong> {prod.material}</p>

                            </div>

                        </td>

                    )}
                </>
            ))}
            {products.length === 0 && (
                <tr>
                    <td colSpan={8}>
                        <div className="text-muted">No products found.</div>
                    </td>
                </tr>
            )}
            </tbody>
            <tfoot>
            ...
            </tfoot>
        </table>
    );
};

export default Products;
