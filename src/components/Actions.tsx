import React, {useEffect, useMemo, useState} from 'react';
import {baseUrlBlog} from "../utils/constants.ts";
import {ProductT, VariantT} from "../utils/types.ts";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../app/hooks.ts";

const Actions = () => {

    /** ------- Variants table handlers ------- */
    const [variants, setVariants] = useState<VariantT[]>([]);
    const [saving, setSaving] = useState(false);
    /** UI state */const token = useAppSelector((state) => state.token);
    const { id = "" } = useParams();

    const [product, setProduct] = useState<ProductT>({
        id: undefined,
        name: "",
        imageUrls: [],
        quantity: 0,
        price: 0,
        category: "",
        weight: 0,
        size: "",
        color: "",
        material: "",
        desc: "",
        dateCreated: undefined,
    });

    /** Track which image is selected for the large preview */
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    /**
     * Track newly added images (files) alongside their object URL previews,
     * so we can both show them and upload just the new ones.
     */
    const [newImages, setNewImages] = useState<{ file: File; url: string }[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newImages, setNewImages] = useState<{ file: File; url: string }[]>([]);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`${baseUrlBlog}/post/${id}`, {
            headers: { Authorization: token },
        })
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to load product");
                const data = await res.json();

                setProduct(data);
                setSelectedImage(data.imageUrls?.[0] || null);

                // Hydrate variants from server if exist, else seed from current product fields
                const serverVariants = (data as any).variants as VariantT[] | undefined;
                if (serverVariants && Array.isArray(serverVariants) && serverVariants.length) {
                    setVariants(
                        serverVariants.map((v) => ({
                            id: uid(),
                            size: v.size ?? data.size ?? "",
                            color: v.color ?? data.color ?? "",
                            material: v.material ?? data.material ?? "",
                            quantity: typeof v.quantity === "number" ? v.quantity : data.quantity ?? 0,
                            price: typeof v.price === "number" ? v.price : data.price ?? 0,
                            sku: v.sku ?? "",
                        }))
                    );
                } else {
                    setVariants([
                        {
                            id: uid(),
                            size: data.size ?? "",
                            color: data.color ?? "",
                            material: data.material ?? "",
                            quantity: data.quantity ?? 0,
                            price: data.price ?? 0,
                            sku: "",
                        },
                    ]);
                }
            })
            .catch(() => setError("Failed to load product"))
            .finally(() => setLoading(false));
    }, [id, token]);


    const handleSubmit = async () => {
        setSaving(true);
        setError(null);
        try {
            // Keep only non-blob existing URLs; upload new ones and merge
            let finalImageUrls = (product.imageUrls || []).filter((url) => !url.startsWith("blob:"));
            if (newImages.length) {
                const uploadedUrls = await uploadImages();
                finalImageUrls = [...finalImageUrls, ...uploadedUrls];
            }

            // Optionally sync top-level fields from the first variant for backward-compat with old UI
            const first = variants[0];

            const toPost: any = {
                ...product,
                imageUrls: finalImageUrls,
                // legacy single fields so other pages still show something meaningful
                size: first?.size ?? product.size,
                color: first?.color ?? product.color,
                material: first?.material ?? product.material,
                quantity: totalQty,
                price: minPrice,
                // new structure for backend
                variants: variants.map(({ id, ...rest }) => rest),
            };

            const res = await fetch(`${baseUrlBlog}/post/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(toPost),
            });

            if (!res.ok) throw new Error("Failed to save product");
            alert("Product updated successfully.");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error saving product.");
        } finally {
            setSaving(false);
        }
    };

    const removeVariantRow = (vid: string) => {
        setVariants((prev) => prev.filter((v) => v.id !== vid));
    };

    const updateVariant = <K extends keyof VariantT>(vid: string, key: K, value: VariantT[K]) => {
        setVariants((prev) => prev.map((v) => (v.id === vid ? { ...v, [key]: value } : v)));
    };

    const addVariantRow = () => {
        setVariants((prev) => [
            ...prev,
            { id: uid(), size: "", color: "", material: "", quantity: 0, price: 0, sku: "" },
        ]);
    };
    // Upload only the new files (from newImages)
    const uploadImages = async (): Promise<string[]> => {
        const urls: string[] = [];
        for (const item of newImages) {
            const fd = new FormData();
            fd.append("file", item.file);
            const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
                method: "POST",
                headers: { Authorization: token },
                body: fd,
            });
            if (!res.ok) throw new Error("Image upload failed");

            const text = await res.text();
            const url = (() => {
                try {
                    return JSON.parse(text).url || text.trim();
                } catch {
                    return text.trim();
                }
            })();
            urls.push(url);
        }
        return urls;
    };

    /** Derived values for totals/min price shown in the table footer */
    const totalQty = useMemo(
        () => variants.reduce((sum, v) => sum + (Number(v.quantity) || 0), 0),
        [variants]
    );
    const minPrice = useMemo(() => {
        const prices = variants
            .map((v) => Number(v.price))
            .filter((n) => !Number.isNaN(n) && Number.isFinite(n));
        return prices.length ? Math.min(...prices) : product.price ?? 0;
    }, [variants, product.price]);

    return (
        <div>
            <div className="mb-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Variants</h5>
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={addVariantRow} disabled={saving}>
                        <i className="fa fa-plus me-1" /> Add row
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-sm table-bordered align-middle">
                        <thead className="table-light">
                        <tr>
                            <th style={{ minWidth: 120 }}>Size</th>
                            <th style={{ minWidth: 140 }}>Color</th>
                            <th style={{ minWidth: 160 }}>Material</th>
                            <th style={{ width: 130 }}>Quantity</th>
                            <th style={{ width: 140 }}>Price (₪)</th>
                            <th style={{ minWidth: 160 }}>SKU</th>
                            <th style={{ width: 60 }}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {variants.map((v) => (
                            <tr key={v.id}>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={v.size ?? ""}
                                        onChange={(e) => updateVariant(v.id, "size", e.target.value)}
                                        disabled={saving}
                                    >
                                        <option value="">—</option>
                                        {sizeOptions.map((s) => (
                                            <option key={s.value} value={s.value}>
                                                {s.name}
                                            </option>
                                        ))}
                                        <option value="custom">Custom</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={v.color ?? ""}
                                        onChange={(e) => updateVariant(v.id, "color", e.target.value)}
                                        disabled={saving}
                                    >
                                        <option value="">—</option>
                                        {exampleColors.map(({ name, value }) => (
                                            <option key={value} value={value}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={v.material ?? ""}
                                        onChange={(e) => updateVariant(v.id, "material", e.target.value)}
                                        disabled={saving}
                                    >
                                        <option value="">—</option>
                                        {allMaterials.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        min={0}
                                        value={v.quantity}
                                        onChange={(e) => updateVariant(v.id, "quantity", Number(e.target.value))}
                                        disabled={saving}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        min={0}
                                        step="0.01"
                                        value={v.price}
                                        onChange={(e) => updateVariant(v.id, "price", Number(e.target.value))}
                                        disabled={saving}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={v.sku ?? ""}
                                        onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                                        disabled={saving}
                                        placeholder="Optional"
                                    />
                                </td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => removeVariantRow(v.id)}
                                        disabled={saving || variants.length === 1}
                                        title={variants.length === 1 ? "Keep at least one row" : "Remove row"}
                                    >
                                        <i className="fa fa-trash" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={3} className="text-end fw-semibold">
                                Totals:
                            </td>
                            <td className="fw-semibold">{totalQty}</td>
                            <td className="fw-semibold">{minPrice.toFixed(2)}</td>
                            <td colSpan={2}></td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 mt-3">
                <button className="btn btn-outline-secondary" onClick={() => window.history.back()} disabled={saving}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={saving || !product.name || !product.category}>
                    {saving ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Save...
                        </>
                    ) : (
                        <>
                            <i className="fa fa-save me-2" />
                            Save
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Actions;
