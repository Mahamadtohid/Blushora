import { createContext, useContext, useMemo, useReducer, useState } from 'react'
import { PRODUCTS } from '../data/products'

const StoreContext = createContext(null)

const initialState = {
  cart: {},
  wishlist: new Set()
}

function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const next = { ...state.cart }
      next[action.id] = (next[action.id] || 0) + 1
      return { ...state, cart: next }
    }
    case 'DEC_FROM_CART': {
      const next = { ...state.cart }
      const current = next[action.id] || 0
      if (current <= 1) delete next[action.id]
      else next[action.id] = current - 1
      return { ...state, cart: next }
    }
    case 'REMOVE_FROM_CART': {
      const next = { ...state.cart }
      delete next[action.id]
      return { ...state, cart: next }
    }
    case 'TOGGLE_WISHLIST': {
      const next = new Set(state.wishlist)
      if (next.has(action.id)) next.delete(action.id)
      else next.add(action.id)
      return { ...state, wishlist: next }
    }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PRODUCTS.filter((p) => {
      const matchesCat = category === 'all' || p.category === category
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list = [...list].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        )
    }
    return list
  }, [query, category, sort])

  const cartItems = useMemo(() => {
    return Object.entries(state.cart).map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id)
      return { ...product, qty }
    })
  }, [state.cart])

  const subtotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cartItems]
  )

  const cartCount = useMemo(
    () => Object.values(state.cart).reduce((a, b) => a + b, 0),
    [state.cart]
  )

  const wishlistItems = useMemo(
    () => PRODUCTS.filter((p) => state.wishlist.has(p.id)),
    [state.wishlist]
  )

  const value = {
    state,
    dispatch,
    cartOpen,
    setCartOpen,
    wishlistOpen,
    setWishlistOpen,
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    filteredProducts,
    cartItems,
    subtotal,
    cartCount,
    wishlistItems
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
