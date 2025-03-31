import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
import { fetchProducts } from "../../useQuery/api/api";
import { useProduct } from "../../useQuery/hooks/useProduct";
import { useQuery } from "@tanstack/react-query";
import { searchName } from "../../useQuery/api/api";

function Search() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ email: string} | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchItem, setSearchItem] = useState<string>("")
  const [cartQuantity, setCartQuantity] = useState<number>(0)
  const [logout, setLogout] = useState(false)


  useEffect(()=>{
    if (logout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload()
      }
    }, [logout]);


  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const {data} = useProduct()

  const { data: products, refetch } = useQuery({
    queryKey: ["searchProducts", searchItem],
    queryFn: () => searchName({ name: searchItem }),
    enabled: false,
  });

  console.log(products)

  return (
    <div className="flex items-center space-x-4 mr-20">
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-64 h-10 p-2"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <span className="absolute right-3 top-2 text-gray-500">
          <button onClick={()=>refetch()}>🔍</button>
        </span>
        {searchItem && (
          <ul className="absolute z-10 bg-white shadow-md rounded w-full mt-2">
            {Array.isArray(products?.data) && products.data.length > 0 ? (
                products.data.map((product) => ( // ❌ Loại bỏ `.data`
                <Link
                  to={`/productdetail/${product.id}`}
                  key={product.id}
                  className="p-2 hover:bg-gray-200 flex items-center space-x-4"
                >
                  <img src={product.images[0]} alt="" className="w-10 h-10" />
                  <span>{product.name}</span>
                </Link>
              ))
            ) : (
              <li className="p-2">Không có sản phẩm phù hợp</li>
            )}
          </ul>
        )}
      </div>
      <Link to='/wishlist'>❤️</Link>
      <Link to="/cart">🛒</Link>
      {user ? (
        <div className="hidden items-center space-x-3 md:flex lg:flex">
          <FaUserCircle className="w-8 h-8 text-gray-700" />
          <span>👋 {user.email}</span>
          <div className="absolute right-24">
            <button onClick={()=>setDropdownOpen(!dropdownOpen)} className="relative">
            <span>▼</span>
            </button>
            {dropdownOpen && (
                <ul className="absolute top-8 right-1 bg-white shadow-md rounded w-44 z-20 p-2 space-y-2">
                  <li className="hover:text-red-400"><Link to='/profile'>Manage My Account</Link></li>
                  <li className="hover:text-red-400"><Link>My Order</Link></li>
                  <li className="hover:text-red-400"><Link>My Cancellations</Link></li>
                  <li className="hover:text-red-400"><Link>My Reviews</Link></li>
                  <li className="hover:text-red-400"><button onClick={()=>setLogout(true)}>Logout</button></li>
                </ul>
            )}
          </div>
        </div>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập</Link>
        )}
    </div>
  )
}

function Menu() {
  const [user, setUser] = useState<{ email: string} | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  return (
    <ul className="hidden md:flex space-x-10 text-gray-600 font-medium">
      <li className=" border-black">
        <Link to="/">Home</Link>
      </li>
      <li className="">
        <Link to="/contact">Contact</Link>
      </li>
      <li className="">
        <Link to="/about">About</Link>
      </li>
      <li className="">
        {user ? (
          <Link to="/profile">My Account</Link>
        ):(
          <Link to="/signin">Sign in</Link>
        )}
      </li>
    </ul>
  )
}

const Header: React.FC = () => {
  const [language, setLanguage] = useState("English")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header>
      {/* Top Banner */}
      <div className="flex bg-black text-white text-center py-4 text-sm justify-center">
        <div className="">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span className="font-bold cursor-pointer ml-2">ShopNow</span>
        </div>
        <div className="absolute right-36">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1"
          >
            <span>{language}</span>
            <span>▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 bg-black shadow-md mt-2 rounded w-24 z-20">
              <p
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => setLanguage("English")}
              >
                English
              </p>
              <p
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => setLanguage("Vietnamese")}
              >
                Vietnamese
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold ml-16">Exclusive</Link>

          {/* Menu */}
          <Menu />

          {/* Search & Icons */}
          <Search />
        </nav>
      </div>
    </header>
  )
}

export default Header
