import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../app/hooks.ts";
import {OrderItemT, OrderT} from "../utils/types.ts";
import {baseUrlBlog} from "../utils/constants.ts";

const statusMap: Record<string, string> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
};

const fmt = (n: number | undefined) =>
    typeof n === "number" ? `₪ ${n.toFixed(2)}` : "—";

function getTotals(o: OrderT) {
  const items = o.orderItems ?? [];
  const qty = items.reduce((s, it) => s + (it.quantity ?? 0), 0);
  const total = items.reduce(
      (s, it) => s + (it.quantity ?? 0) * (it.unitPrice ?? 0),
      0
  );
  return { qty, total };
}

const Orders = () => {
  const user = useAppSelector((s) => s.user.profile);
  const nav = useNavigate();

  const [orders, setOrders] = useState<OrderT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const [editIndex, setEditIndex] = useState<{ orderId: string; itemId: string } | null>(null);
  const [formData, setFormData] = useState<OrderItemT | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseUrlBlog}/orders-all`);
        if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`);
        const data: OrderT[] = await res.json();
        setOrders(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.login]);

  const handleEdit = (orderId: string, item: OrderItemT) => {
    setEditIndex({ orderId, itemId: item.productId! });
    setFormData({ ...item });
    setOpenRow(orderId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;
    setFormData((prev) => {
      if (!prev) return null;
      const updated = { ...prev };
      if (name === "quantity") updated.quantity = Number(value);
      else if (name === "unitPrice") updated.unitPrice = Number(value);
      else if (name === "productName") updated.productId = value;
      return updated;
    });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setFormData(null);
  };

  const handleSave = () => {
    if (!formData || !editIndex) return;
    const updated = orders.map((order) => {
      if (order.orderId !== editIndex.orderId) return order;
      return {
        ...order,
        orderItems: order.orderItems.map((it) =>
            it.productId === editIndex.itemId ? formData : it
        ),
      };
    });
    setOrders(updated);
    setEditIndex(null);
    setFormData(null);
  };

  if (loading)
    return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <div className="mt-2">Loading orders...</div>
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
          <th scope="col">Order</th>
          <th scope="col">Items</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>

        <tbody>
        {orders.map((order) => {
          const { qty, total } = getTotals(order);
          const isOpen = openRow === order.orderId;

          return (
              <React.Fragment key={order.orderId}>
                <tr>
                  <td>
                    <button
                        className="btn btn-sm"
                        onClick={() => setOpenRow(isOpen ? null : order.orderId!)}
                    >
                      <i className={`fa ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`} />
                    </button>
                  </td>
                  <td>
                    <Link to={`/order/${order.orderId}`} className="text-decoration-none">
                      #{order.orderId}
                    </Link>
                  </td>
                  <td>{qty}</td>
                  <td>{fmt(total)}</td>
                  <td>
                  <span
                      className={`badge bg-${
                          statusMap[order.status ?? "Paid"] ?? "secondary"
                      }`}
                  >
                    {order.status ?? "Paid"}
                  </span>
                  </td>
                  <td>
                    <button
                        className="fa fa-eye fa-lg me-3 p-0 border-0 text-primary"
                        onClick={() => nav(`/order/${order.orderId}`)}
                        title="View"
                    />
                  </td>
                </tr>

                {isOpen && (
                    <tr>
                      <td colSpan={6}>
                        <div className="bg-light p-3 rounded shadow-sm">
                          <div className="d-flex flex-wrap gap-3 mb-3">
                            <p className="mb-0">
                              <strong>Order ID:</strong> {order.orderId}
                            </p>
                            {order?.dateCreated && (
                                <p className="mb-0">
                                  <strong>Created:</strong>{" "}
                                  {new Date(order.dateCreated as any).toLocaleString()}
                                </p>
                            )}
                          </div>

                          <div className="table-responsive">
                            <table className="table table-sm align-middle m-0 text-center">
                              <thead>
                              <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                              </tr>
                              </thead>
                              <tbody>
                              {(order.orderItems ?? []).map((item) => {
                                const editing =
                                    editIndex?.orderId === order.orderId &&
                                    editIndex?.itemId === item.productId;

                                const q = editing ? formData?.quantity ?? item.quantity ?? 0 : item.quantity ?? 0;
                                const p = editing ? formData?.unitPrice ?? item.unitPrice ?? 0 : item.unitPrice ?? 0;
                                const subtotal = q * p;

                                return (
                                    <tr key={`${order.orderId}-${item.productId}`}>
                                      <td className="text-start">
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="productName"
                                                className="form-control form-control-sm"
                                                value={formData?.productId || ""}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            item.productId
                                        )}
                                      </td>
                                      <td style={{ width: 140 }}>
                                        {editing ? (
                                            <input
                                                type="number"
                                                name="quantity"
                                                min={1}
                                                className="form-control form-control-sm text-center"
                                                value={formData?.quantity ?? 1}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            item.quantity
                                        )}
                                      </td>
                                      <td style={{ width: 160 }}>
                                        {editing ? (
                                            <input
                                                type="number"
                                                name="unitPrice"
                                                step="0.01"
                                                className="form-control form-control-sm text-center"
                                                value={formData?.unitPrice ?? 0}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            fmt(item.unitPrice)
                                        )}
                                      </td>
                                      <td>{fmt(subtotal)}</td>
                                      <td style={{ width: 180 }}>
                                        {editing ? (
                                            <>
                                              <button
                                                  className="btn btn-outline-secondary btn-sm me-1"
                                                  onClick={handleCancel}
                                              >
                                                Cancel
                                              </button>
                                              <button
                                                  className="btn btn-primary btn-sm"
                                                  onClick={handleSave}
                                              >
                                                Save
                                              </button>
                                            </>
                                        ) : (
                                            <button
                                                className="btn btn-info btn-sm"
                                                onClick={() => handleEdit(order.orderId!, item)}
                                            >
                                              Edit
                                            </button>
                                        )}
                                      </td>
                                    </tr>
                                );
                              })}

                              {(order.orderItems ?? []).length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="text-muted">
                                      No items in this order.
                                    </td>
                                  </tr>
                              )}
                              </tbody>
                              <tfoot>
                              <tr>
                                <td colSpan={3} className="text-end fw-bold">
                                  Total:
                                </td>
                                <td className="fw-bold">{fmt(getTotals(order).total)}</td>
                                <td />
                              </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                )}
              </React.Fragment>
          );
        })}

        {orders.length === 0 && (
            <tr>
              <td colSpan={6}>
                <div className="text-muted">No orders found.</div>
              </td>
            </tr>
        )}
        </tbody>

        <tfoot>{/* optional pager / totals */}</tfoot>
      </table>
  );
};

export default Orders;
