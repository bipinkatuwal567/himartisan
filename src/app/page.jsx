import HomePage from "../components/HomePage";
import ProductPage from "../components/ProductPage";
import CategoriesPage from "../components/CategoriesPage"
import CategoryProduct from '../components/CategoryProduct'

export default function Home() {
  return (
    <>
      <HomePage />
      <ProductPage />
      <CategoriesPage />
      {/* <CategoryProduct/> */}
    </>
  );
}
