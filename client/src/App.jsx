import React, { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'

// Lazy loading components
const Home = lazy(() => import('./pages/Home'))
const AllProducts = lazy(() => import('./pages/AllProducts'))
const ProductCategory = lazy(() => import('./pages/ProductCategory'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const AddAddress = lazy(() => import('./pages/AddAddress'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const Loading = lazy(() => import('./components/Loading'))

// Seller components
const SellerLogin = lazy(() => import('./components/seller/SellerLogin'))
const SellerLayout = lazy(() => import('./pages/seller/SellerLayout'))
const AddProduct = lazy(() => import('./pages/seller/AddProduct'))
const ProductList = lazy(() => import('./pages/seller/ProductList'))
const Orders = lazy(() => import('./pages/seller/Orders'))

// Simple Loader for Suspense Fallback
const PageLoader = () => (
  <div className='flex justify-center items-center h-[70vh]'>
    <div className='animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-primary'></div>
  </div>
)

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white overflow-x-hidden' >
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-4 md:px-16 lg:px-24 max-w-screen-2xl mx-auto"}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/products/:category' element={<ProductCategory />} />
            <Route path='/products/:category/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/add-address' element={<AddAddress />} />
            <Route path='/my-orders' element={<MyOrders />} />
            <Route path='/loader' element={<Loading />} />
            <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path='product-list' element={<ProductList />} />
              <Route path='orders' element={<Orders />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App;
