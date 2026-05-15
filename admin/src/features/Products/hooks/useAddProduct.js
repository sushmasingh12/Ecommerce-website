import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectSubmitting,
  selectSubmitSuccess,
  selectSubmitError,
} from "../store/productsSelectors";
import { addProduct, resetSubmit } from "../store/productsSlice";

const INITIAL_FORM = {
  // General
  title: "",
  subdesc: "",
  description: "",
  artisanNote: "",

  // Media
  images: [],          // [{ id, url, file }]

  // Variants
  colors: ["Black", "White"],
  sizes: ["S", "M", "L", "XL"],
  materials: ["cotton", "silk"],

  // Status
  status: "Active",    // "Active" | "Draft" | "Archived"

  // Organization — matches Bazario navigationData.js
  category: "",
  subcategory: "",
  brand: "",
  gender: "Unisex",
  tags: [],

  // Pricing & Inventory
  basePrice: "",
  discount: "",
  currency: "INR",
  badge: "",
  sku: "",
  stock: 0,

  // Product Details
  highlights: [],
  specifications: {
    fit: "",
    fabric: "",
    origin: "",
  },
  composition: {
    outer: "",
    lining: "",
    care: "",
  },
  shippingDetails: {
    delivery: "",
    returns: "",
    warranty: "",
  },

  // Ratings
  ratingBreakdown: {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },

  // SEO
  seoTitle: "",
  seoUrl: "",
  seoDescription: "",
};

export function useAddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitting = useSelector(selectSubmitting);
  const submitSuccess = useSelector(selectSubmitSuccess);
  const submitError = useSelector(selectSubmitError);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");

  // Redirect on success
  useEffect(() => {
    if (submitSuccess) {
      dispatch(resetSubmit());
      navigate("/products");
    }
  }, [submitSuccess, dispatch, navigate]);

  // Cleanup on unmount
  useEffect(() => () => { dispatch(resetSubmit()); }, [dispatch]);

  // ── Field helpers ─────────────────────────────────────────
  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  // Stock stepper
  const incrementStock = useCallback(() =>
    setForm((p) => ({ ...p, stock: p.stock + 1 })), []);
  const decrementStock = useCallback(() =>
    setForm((p) => ({ ...p, stock: Math.max(0, p.stock - 1) })), []);

  // Variants — Colors
  const addColor = useCallback((color) => {
    const c = color.trim();
    setForm((p) =>
      p.colors.includes(c) ? p : { ...p, colors: [...p.colors, c] }
    );
  }, []);
  const removeColor = useCallback((color) =>
    setForm((p) => ({ ...p, colors: p.colors.filter((c) => c !== color) })), []);

  // Variants — Sizes
  const addSize = useCallback((size) => {
    const s = size.trim();
    setForm((p) =>
      p.sizes.includes(s) ? p : { ...p, sizes: [...p.sizes, s] }
    );
  }, []);
  const removeSize = useCallback((size) =>
    setForm((p) => ({ ...p, sizes: p.sizes.filter((s) => s !== size) })), []);

  // Variants — Materials
  const addMaterial = useCallback((material) => {
    const m = material.trim();
    setForm((p) =>
      p.materials.includes(m) ? p : { ...p, materials: [...p.materials, m] }
    );
  }, []);
  const removeMaterial = useCallback((material) =>
    setForm((p) => ({ ...p, materials: p.materials.filter((m) => m !== material) })), []);

  // Tags
  const addTag = useCallback((tag) => {
    const t = tag.trim().toUpperCase();
    if (t) {
      setForm((p) =>
        p.tags.includes(t) ? p : { ...p, tags: [...p.tags, t] }
      );
      setTagInput("");
    }
  }, []);
  const removeTag = useCallback((tag) =>
    setForm((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) })), []);

  // Highlights
  const [highlightInput, setHighlightInput] = useState("");
  const addHighlight = useCallback((highlight) => {
    const h = highlight.trim();
    if (h) {
      setForm((p) => ({ ...p, highlights: [...p.highlights, h] }));
      setHighlightInput("");
    }
  }, []);
  const removeHighlight = useCallback((index) =>
    setForm((p) => ({ ...p, highlights: p.highlights.filter((_, i) => i !== index) })), []);

  // Images
  const addImages = useCallback((files) => {
    const newImgs = Array.from(files).map((file) => ({
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setForm((p) => ({ ...p, images: [...p.images, ...newImgs].slice(0, 10) }));
  }, []);

  const addImageByUrl = useCallback((url) => {
    if (!url.trim()) return;
    const newImg = {
      id: `url-${Date.now()}`,
      url: url.trim(),
      isExternal: true, // Mark it as an external URL
    };
    setForm((p) => ({ ...p, images: [...p.images, newImg].slice(0, 10) }));
  }, []);

  const removeImage = useCallback((id) =>
    setForm((p) => ({ ...p, images: p.images.filter((img) => img.id !== id) })), []);

  // ── Validation ────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Product title is required";
    if (!form.basePrice) newErrors.basePrice = "Base price is required";
    if (form.basePrice < 0) newErrors.basePrice = "Price must be positive";
    if (!form.sku.trim()) newErrors.sku = "SKU is required";
    if (!form.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit handlers ───────────────────────────────────────
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
    highlightInput,
    setHighlightInput,
    submitting,
    submitError,
    setField,
    incrementStock,
    decrementStock,
    addColor,
    removeColor,
    addSize,
    removeSize,
    addMaterial,
    removeMaterial,
    addTag,
    removeTag,
    addHighlight,
    removeHighlight,
    addImages,
    addImageByUrl,
    removeImage,
    handlePublish,
    handleSaveDraft,
    handleCancel,
  };
}
