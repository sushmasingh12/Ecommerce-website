const SkeletonRow = () => {
  return (
    <tr>
      {[...Array(8)].map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-4 bg-slate-100 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

const ProductsTableSkeleton = ({ rows = 5 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </>
  );
}

export default ProductsTableSkeleton