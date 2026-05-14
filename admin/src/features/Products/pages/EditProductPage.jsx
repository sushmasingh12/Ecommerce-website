import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct } from '../store/productsSlice';
import AddProductHeader from "../components/addProducts/AddProductHeader";
import GeneralInfoCard from "../components/addProducts/GeneralInfoCard";
import MediaCard from "../components/addProducts/MediaCard";
import OrganizationCard from "../components/addProducts/OrganizationCard";
import PricingInventoryCard from "../components/addProducts/PricingInventoryCard";
import SEOPreviewCard from "../components/addProducts/SEOPreviewCard";
import StatusCard from "../components/addProducts/StatusCard";
import VariantsCard from "../components/addProducts/VariantsCard";
import DetailsCard from "../components/addProducts/DetailsCard";
import { toast } from 'react-hot-toast';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  
  const product = items.find((p) => p.id === id);
   const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    } else {
      setForm({
         title: product.title || "",
        subdesc: product.subdesc || "",
        description: product.description || "",
        artisanNote: product.artisanNote || "",
        basePrice: product.basePrice || "",
        discount: product.discount || 0,
        currency: product.currency || "INR",
        badge: product.badge || "",
        brand: product.brand || "",
        gender: product.gender || "Unisex",
        stock: product.stock || 0,
        category: product.category || "",
        subcategory: product.subcategory || "",
        sku: product.sku || "",
        status: product.status || "Active",
        tags: product.tags || [],
        colors: product.colors || [],
        sizes: product.sizes || [],
        materials: product.materials || [],
        highlights: product.highlights || [],
        specifications: product.specifications || { fit: "", fabric: "", origin: "" },
        composition: product.composition || { outer: "", lining: "", care: "" },
        shippingDetails: product.shippingDetails || { delivery: "", returns: "", warranty: "" },
        ratingBreakdown: product.ratingBreakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        images: (product.images || []).map(img => ({
          ...img,
          id: img.id || img._id || Math.random().toString(36).substr(2, 9),
          url: img.url || ""
        })),
        seoTitle: product.seoTitle || "",
        seoUrl: product.seoUrl || "",
        seoDescription: product.seoDescription || "",
      });
    }
  }, [dispatch, product, id]);

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await dispatch(updateProduct({ id, data: form })).unwrap();
      toast.success('Product updated successfully');
      navigate('/products');
    } catch (err) {
      toast.error(err.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  const setField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handlers matching useAddProduct logic
  const incrementStock = useCallback(() => setForm(p => ({ ...p, stock: p.stock + 1 })), []);
  const decrementStock = useCallback(() => setForm(p => ({ ...p, stock: Math.max(0, p.stock - 1) })), []);

  const addColor = useCallback((c) => setForm(p => p.colors.includes(c) ? p : { ...p, colors: [...p.colors, c] }), []);
  const removeColor = useCallback((c) => setForm(p => ({ ...p, colors: p.colors.filter(x => x !== c) })), []);

  const addSize = useCallback((s) => setForm(p => p.sizes.includes(s) ? p : { ...p, sizes: [...p.sizes, s] }), []);
  const removeSize = useCallback((s) => setForm(p => ({ ...p, sizes: p.sizes.filter(x => x !== s) })), []);

  const addMaterial = useCallback((m) => setForm(p => p.materials.includes(m) ? p : { ...p, materials: [...p.materials, m] }), []);
  const removeMaterial = useCallback((m) => setForm(p => ({ ...p, materials: p.materials.filter(x => x !== m) })), []);

  const addTag = useCallback((t) => {
    const tag = t.trim().toUpperCase();
    if (tag) {
      setForm(p => p.tags.includes(tag) ? p : { ...p, tags: [...p.tags, tag] });
      setTagInput("");
    }
  }, []);
   const removeTag = useCallback((t) => setForm(p => ({ ...p, tags: p.tags.filter(x => x !== t) })), []);
 
  const addHighlight = useCallback((h) => {
    const val = h.trim();
    if (val) {
      setForm(p => ({ ...p, highlights: [...p.highlights, val] }));
      setHighlightInput("");
    }
  }, []);
  const removeHighlight = useCallback((index) => setForm(p => ({ ...p, highlights: p.highlights.filter((_, i) => i !== index) })), []);

  const addImages = useCallback((files) => {
    const newImgs = Array.from(files).map(file => ({
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      file
    }));
    setForm(p => ({ ...p, images: [...p.images, ...newImgs].slice(0, 10) }));
  }, []);
  const removeImage = useCallback((id) => setForm(p => ({ ...p, images: p.images.filter(img => (img.id || img._id) !== id) })), []);

  if (!form) return <div className="p-12 text-center font-bold text-on-surface-variant">Loading product data...</div>;

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <AddProductHeader 
        title="Edit Product"
        onPublish={handleSave}
        onCancel={() => navigate('/products')}
        submitting={submitting}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          <GeneralInfoCard form={form} setField={setField} errors={{}} />
          
          <MediaCard 
            images={form.images} 
            onAdd={addImages} 
            onRemove={removeImage} 
          />

           <VariantsCard 
            form={form}
            onAddColor={addColor}
            onRemoveColor={removeColor}
            onAddSize={addSize}
            onRemoveSize={removeSize}
            onAddMaterial={addMaterial}
            onRemoveMaterial={removeMaterial}
          />

          <DetailsCard 
            form={form}
            setField={setField}
            highlightInput={highlightInput}
            setHighlightInput={setHighlightInput}
            onAddHighlight={addHighlight}
            onRemoveHighlight={removeHighlight}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          <StatusCard value={form.status} onChange={(val) => setField('status', val)} />
          
          <OrganizationCard 
            form={form} 
            setField={setField} 
            tagInput={tagInput} 
            setTagInput={setTagInput} 
            onAddTag={addTag}
            onRemoveTag={removeTag}
            errors={{}}
          />

          <PricingInventoryCard 
            form={form} 
            setField={setField} 
            onIncrement={incrementStock}
            onDecrement={decrementStock}
            errors={{}} 
          />

          <SEOPreviewCard form={form} setField={setField} />
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
