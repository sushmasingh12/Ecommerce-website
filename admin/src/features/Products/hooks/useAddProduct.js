import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSubmitting,
  selectSubmitSuccess,
  selectSubmitError, } from "../store/productsSelectors";

import { addProduct, resetSubmit } from "../store/productsSlice";
const INITIAL_FORM = {
  // General
  title: "",
  description: "",

  // Media
  images: [],          // [{ id, url, file }]

  // Variants
  colors: ["Obsidian Black", "Slate Grey"],
  sizes: ["64GB", "128GB"],

  // Status
  status: "Active",    // "Active" | "Draft" | "Archived"

  // Organization
  category: "Digital Photography",
  tags: ["NEW ARRIVAL", "PREMIUM"],

  // Pricing & Inventory
  basePrice: "",
  discount: "",
  sku: "",
  stock: 12,

  // SEO
  seoTitle: "",
  seoUrl: "",
  seoDescription: "",
};

export function useAddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitting    = useSelector(selectSubmitting);
  const submitSuccess = useSelector(selectSubmitSuccess);
  const submitError   = useSelector(selectSubmitError);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState({});
  const [tagInput, setTagInput] = useState("");

  // Redirect on success
  useEffect(() => {
    if (submitSuccess) {
      dispatch(resetSubmit());
      navigate("/products");
    }
  }, [submitSuccess, dispatch, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { dispatch(resetSubmit()); };
  }, [dispatch]);

  // ── Field helpers ──────────────────────────────────────
  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  // Stock stepper
  const incrementStock = useCallback(() =>
    setForm((p) => ({ ...p, stock: p.stock + 1 })), []);
  const decrementStock = useCallback(() =>
    setForm((p) => ({ ...p, stock: Math.max(0, p.stock - 1) })), []);

  // Variants
  const removeColor = useCallback((color) =>
    setForm((p) => ({ ...p, colors: p.colors.filter((c) => c !== color) })), []);
  const addColor = useCallback((color) => {
    if (color && !form.colors.includes(color))
      setForm((p) => ({ ...p, colors: [...p.colors, color] }));
  }, [form.colors]);

  const removeSize = useCallback((size) =>
    setForm((p) => ({ ...p, sizes: p.sizes.filter((s) => s !== size) })), []);
  const addSize = useCallback((size) => {
    if (size && !form.sizes.includes(size))
      setForm((p) => ({ ...p, sizes: [...p.sizes, size] }));
  }, [form.sizes]);

  // Tags
  const addTag = useCallback((tag) => {
    const t = tag.trim().toUpperCase();
    if (t && !form.tags.includes(t)) {
      setForm((p) => ({ ...p, tags: [...p.tags, t] }));
      setTagInput("");
    }
  }, [form.tags]);
  const removeTag = useCallback((tag) =>
    setForm((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) })), []);

  // Images
  const addImages = useCallback((files) => {
    const newImgs = Array.from(files).map((file) => ({
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setForm((p) => ({ ...p, images: [...p.images, ...newImgs].slice(0, 10) }));
  }, []);
  const removeImage = useCallback((id) =>
    setForm((p) => ({ ...p, images: p.images.filter((img) => img.id !== id) })), []);

  // ── Validation ─────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim())     newErrors.title = "Product title is required";
    if (!form.basePrice)        newErrors.basePrice = "Base price is required";
    if (!form.sku.trim())       newErrors.sku = "SKU is required";
    if (!form.category)         newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit handlers ────────────────────────────────────
  const handlePublish = () => {
    if (!validate()) return;
    dispatch(addProduct({ ...form, status: "Active" }));
  };

  const handleSaveDraft = () => {
    dispatch(addProduct({ ...form, status: "Draft" }));
  };

  const handleCancel = () => navigate("/products");

  return {
    form,
    errors,
    tagInput,
    setTagInput,
    submitting,
    submitError,
    setField,
    incrementStock,
    decrementStock,
    addColor,
    removeColor,
    addSize,
    removeSize,
    addTag,
    removeTag,
    addImages,
    removeImage,
    handlePublish,
    handleSaveDraft,
    handleCancel,
  };
}