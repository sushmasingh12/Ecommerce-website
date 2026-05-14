import AddProductHeader from "../components/addProducts/AddProductHeader";
import GeneralInfoCard from "../components/addProducts/GeneralInfoCard";
import MediaCard from "../components/addProducts/MediaCard";
import DetailsCard from "../components/addProducts/DetailsCard";
import OrganizationCard from "../components/addProducts/OrganizationCard";
import PricingInventoryCard from "../components/addProducts/PricingInventoryCard";
import SEOPreviewCard from "../components/addProducts/SEOPreviewCard";
import StatusCard from "../components/addProducts/StatusCard";
import VariantsCard from "../components/addProducts/VariantsCard";
import { useAddProduct } from "../hooks/useAddProduct";



const AddProduct = () =>{
  const {
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
    removeImage,
    handlePublish,
    handleSaveDraft,
    handleCancel,
  } = useAddProduct();

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <AddProductHeader
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
        onCancel={handleCancel}
        submitting={submitting}
      />

      {/* Error Banner */}
      {submitError && (
        <div className="mb-6 p-4 bg-error-container text-error rounded-xl text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">error</span>
          {submitError}
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col — 8/12 */}
        <div className="lg:col-span-8 space-y-8">
          <GeneralInfoCard
            form={form}
            errors={errors}
            setField={setField}
          />
          <MediaCard
            images={form.images}
            onAdd={addImages}
            onRemove={removeImage}
          />
          <DetailsCard
            form={form}
            setField={setField}
            highlightInput={highlightInput}
            setHighlightInput={setHighlightInput}
            onAddHighlight={addHighlight}
            onRemoveHighlight={removeHighlight}
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
        </div>

        {/* Right Col — 4/12 */}
        <div className="lg:col-span-4 space-y-8">
          <StatusCard
            value={form.status}
            onChange={(val) => setField("status", val)}
          />
          <OrganizationCard
            form={form}
            errors={errors}
            tagInput={tagInput}
            setTagInput={setTagInput}
            setField={setField}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />
          <PricingInventoryCard
            form={form}
            errors={errors}
            setField={setField}
            onIncrement={incrementStock}
            onDecrement={decrementStock}
          />
          <SEOPreviewCard
            form={form}
            setField={setField}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-outline-variant/10 text-center">
        <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">
          © 2024 Curator AI • Ver 4.2.0
        </p>
      </footer>
    </div>
  );
}

export default AddProduct 