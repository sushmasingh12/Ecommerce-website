# Bazario — Modern Ecommerce Frontend

Bazario is a premium, responsive ecommerce frontend built with **React**, **Vite**, **Tailwind CSS v4**, **Redux Toolkit**, and **React Router**. It provides a sophisticated shopping experience with a focus on aesthetics, performance, and scalability.

The project follows a **feature-based architecture**, making it easy to maintain and expand. It includes comprehensive flows for browsing products, managing a cart/wishlist, user authentication, and account management.

---

## ✨ Key Features

### 🛍️ Shopping Experience
- **Dynamic Landing Page**: Modern bento-style category layouts and trending showcases.
- **Product Discovery**: Category and subcategory-based browsing with advanced filtering (Price, Size, Material, etc.).
- **Product Details**: Rich product pages with galleries, variant selection, and AI-powered review summaries.
- **Wishlist & Cart**: Fully functional state-managed wishlist and cart systems.
- **Checkout Flow**: Clean and professional multi-step checkout simulation.

### 👤 User & Account
- **Authentication**: Feature-rich Sign In and Sign Up pages using `react-hook-form`.
- **Account Dashboard**: Comprehensive layout for managing profile details, order history, addresses, and payment methods.
- **Persistence**: State is automatically persisted to `localStorage` (Cart, Wishlist, Auth).

### 🚀 Production-Ready Optimizations
- **SEO Management**: Integrated `react-helmet-async` for dynamic page titles and meta tags.
- **Performance**: Route-level code splitting using `React.lazy` and `Suspense`.
- **Error Handling**: Global `ErrorBoundary` to catch and handle runtime errors gracefully.
- **404 Handling**: Custom "Not Found" page for unknown routes.
- **Accessibility**: ARIA labels, semantic HTML, and focus management.
- **Image Strategy**: Native lazy loading for off-screen images and eager loading for hero sections.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router 6](https://reactrouter.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: Material Symbols Outlined

---

## 📂 Project Structure

```text
src/
├── app/                # Global configuration (Store, Routes, Layout)
├── features/           # Feature-based modules
│   ├── account/        # Profile, Orders, Addresses
│   ├── auth/           # Login, Signup, Auth logic
│   ├── cart/           # Cart management
│   ├── checkout/       # Checkout flow
│   ├── dashboard/      # Landing page components
│   ├── footer/         # Support & Editorial pages
│   ├── products/       # Catalog, Details, Filtering
│   └── wishlist/       # Wishlist management
├── shared/             # Reusable global logic
│   ├── components/     # UI components (Buttons, Inputs, Modals)
│   ├── hooks/          # Global hooks
│   └── utils/          # Formatting, Persistence, Helpers
└── main.jsx            # Entry point
```

---

