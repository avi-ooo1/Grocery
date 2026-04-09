import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, axios } = useAppContext();

    const logout = async () => {
       try {
        const {data} = await axios.get('/api/user/logout');
        if (data.success) {
            toast.success(data.message);
            setUser(null);
            navigate('/');
        }else{
            toast.error(data.message);
        }
       } catch (error) {
        toast.error(error.message);
       }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center justify-between px-4 md:px-16 lg:px-24 py-4 max-w-screen-2xl mx-auto">
                
                {/* Logo */}
                <NavLink to='/' onClick={() => setOpen(false)} className="flex items-center">
                    <img className="h-8 md:h-10 transition-transform hover:scale-105" src={assets.logo} alt="logo" />
                </NavLink>

                {/* Desktop Menu & Seller Dashboard */}
                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <NavLink to={'/seller'} className="px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold hover:bg-gray-50 transition-all uppercase tracking-wide">
                        Seller Dashboard
                    </NavLink>
                    <NavLink to={'/'} className={({isActive})=> isActive ? "text-primary relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary" : "hover:text-primary transition"}>Home</NavLink>
                    <NavLink to={'/products'} className={({isActive})=> isActive ? "text-primary relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary" : "hover:text-primary transition"}>All Product</NavLink>
                </div>

                {/* Actions: Search, Cart, Profile */}
                <div className='flex items-center gap-4 md:gap-6'>
                    
                    {/* Search Bar */}
                    <div className="hidden sm:flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all group lg:w-72">
                        <input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="bg-transparent outline-none text-sm w-full placeholder-gray-400" 
                            type="text" 
                            placeholder="Search products" 
                        />
                        <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-40 group-focus-within:opacity-80 transition-opacity' />
                    </div>

                    {/* Cart Icon */}
                    <div onClick={() => {navigate("/cart"); setOpen(false)}} className="relative cursor-pointer hover:scale-110 transition-transform">
                        <img src={assets.nav_cart_icon} alt="cart" className='w-6 md:w-7' />
                        <span className="absolute -top-1.5 -right-1.5 text-[10px] text-white bg-primary w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                            {getCartCount()}
                        </span>
                    </div>

                    {/* Profile/Login */}
                    <div className='hidden md:block'>
                        {!user ? (
                            <button onClick={() => setShowUserLogin(true)} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition">
                                <img src={assets.profile_icon} className='w-5 h-5 opacity-70' alt="login" />
                            </button>
                        ) : (
                            <div className='relative group'>
                                <img src={assets.profile_icon} className='w-10 h-10 rounded-full cursor-pointer border-2 border-transparent group-hover:border-primary transition' alt="profile" />
                                <div className='hidden group-hover:block absolute top-full right-0 pt-2 z-50 animate-fadeIn'>
                                    <ul className='bg-white shadow-2xl border border-gray-100 py-2 w-44 rounded-xl text-sm overflow-hidden'>
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="font-bold text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <li onClick={() => navigate("my-orders")} className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2'>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                            My Orders
                                        </li>
                                        <li onClick={logout} className='px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-red-500 flex items-center gap-2'>
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400/40"></span>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setOpen(!open)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition">
                        <img src={assets.menu_icon} alt="menu" className='w-6' />
                    </button>
                </div>
            </div>

            {/* Mobile Search */}
            <div className='sm:hidden px-4 pb-4'>
                <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-200 focus-within:border-primary transition-all">
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="bg-transparent outline-none text-sm w-full placeholder-gray-400 text-gray-700" 
                        type="text" 
                        placeholder="Search products..." 
                    />
                    <img src={assets.search_icon} alt="search" className='w-5 h-5 opacity-40' />
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
            
            {/* Mobile Menu Drawer */}
            <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[70] shadow-2xl transition-all duration-500 ease-out transform ${open ? 'translate-x-0' : 'translate-x-full invisible'}`}>
                <div className='p-8 flex flex-col h-full'>
                    <div className='flex justify-between items-center mb-10'>
                        <img src={assets.logo} className='h-8' alt="logo" />
                        <button onClick={() => setOpen(false)} className='w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-xl text-gray-400 hover:text-gray-600 transition'>✕</button>
                    </div>

                    <div className='flex flex-col gap-6 text-lg font-semibold text-gray-800'>
                        <NavLink to='/' onClick={() => setOpen(false)} className={({isActive})=> isActive ? "text-primary flex items-center gap-3" : "flex items-center gap-3"}>
                            {({isActive}) => (
                                <>
                                    <span className={`w-1 h-6 rounded-full ${isActive ? 'bg-primary' : ''}`}></span>
                                    Home
                                </>
                            )}
                        </NavLink>
                        <NavLink to='/products' onClick={() => setOpen(false)} className={({isActive})=> isActive ? "text-primary flex items-center gap-3" : "flex items-center gap-3"}>
                            {({isActive}) => (
                                <>
                                    <span className={`w-1 h-6 rounded-full ${isActive ? 'bg-primary' : ''}`}></span>
                                    All Product
                                </>
                            )}
                        </NavLink>
                        <NavLink to='/seller' onClick={() => setOpen(false)} className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-bold text-center border border-gray-200">
                            Seller Dashboard
                        </NavLink>
                        {user && (
                            <NavLink to='/my-orders' onClick={() => setOpen(false)} className={({isActive})=> isActive ? "text-primary flex items-center gap-3" : "flex items-center gap-3"}>
                                {({isActive}) => (
                                    <>
                                        <span className={`w-1 h-6 rounded-full ${isActive ? 'bg-primary' : ''}`}></span>
                                        My Orders
                                    </>
                                )}
                            </NavLink>
                        )}
                    </div>

                    <div className='mt-auto pt-8 border-t border-gray-100'>
                        {!user ? (
                            <button onClick={() => { setOpen(false); setShowUserLogin(true) }} className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
                                Login / Signup
                            </button>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-4 p-3 bg-gray-50 rounded-2xl'>
                                    <img src={assets.profile_icon} className='w-12 h-12 rounded-full border-2 border-white shadow-sm' alt="" />
                                    <div className="flex-1 overflow-hidden">
                                        <p className='font-bold text-gray-900 truncate'>{user.name}</p>
                                        <button onClick={logout} className='text-xs text-red-500 font-medium'>Logout Account</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
