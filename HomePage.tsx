import { useState} from "react";
import PaginadorCarrito from "../../components/PaginadorCarrito/PaginadorCarrito";
import Productos from "../../components/Productos/Productos";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import useScreenSize from "../../hooks/useScreenSize";
import Tablas from "../../components/Tabla/Tablas";
import { ShoppingCart } from "lucide-react";
import { ProductosPropsModel } from "../../models/productos/productos.model";
import { useHeightHomepage } from "../../hooks/useHeightHomepage";
import { useHomePageContext } from "../../page/Private/HomePage/Context/HomePageContext";
import { useHomePage } from "../../page/Private/HomePage/HomePage.hook";


interface DataProps {
    data: ProductosPropsModel[]
 
}

export type SelectState = {[key:string]: boolean}
const HomeComponent = ({data}: DataProps) => {
    const {cartItems, setCartItems, indice, setTotalDescuentoSum, search, setSearch} = useHomePageContext()
    useHomePage({data: data})
    const {width} = useScreenSize()
     const {height, footerRef, paginadorRef, heightTable, searchRef, otrosCostos, setOpenCarrito, openCarrito } =  useHeightHomepage()
   
  const currentCartItems = Array.isArray(cartItems[indice]) ? cartItems[indice] : [];
  const filteredData = data?.filter((item) => {
    const nameMatch = item?.name?.toString()?.toLowerCase()?.includes(search.toLowerCase());
    const claveMatch = item?.clave?.toString()?.toLowerCase()?.includes(search.toLowerCase());
    return nameMatch || claveMatch;
  });
   
  const initialState = currentCartItems?.reduce((acc, curr) => ({...acc, [curr.id]: false}), {})
 const [selectProduct, setSelectProduct] = useState<SelectState>(initialState);
 const toggleSelectProduct = (id: string) => {
   setSelectProduct((prev) => ({...prev, [id]: !prev[id]}))
 };


  return (
    <>
      <PaginadorCarrito paginadorRef={paginadorRef}  />
      
      <div >
        <Search search={search} 
        selectProduct={selectProduct} 
        searchRef={searchRef}
        setSearch={setSearch}
        openCarrito={openCarrito} 
        setOpenCarrito={setOpenCarrito} 
        setSelectProduct={setSelectProduct} 
        setCartItems={setCartItems} 
        setTotalDescuentoSum={setTotalDescuentoSum}
        data={data}
        currentCartItems={currentCartItems}
        indice={indice}/>
         
      </div>
      { width < 850 &&  
      <button className='boton-shop-2 btn btn-primary'type='button' onClick={ () => setOpenCarrito && setOpenCarrito(!openCarrito)}><ShoppingCart /></button>  
        } 
   { <div className=" col-12 d-flex">
    {!openCarrito || width > 850 ?  (
   <div  className={ width < 850 ? "col-12  col-sm-12 col-md-12  col-xl-8 products-again" :  "col-12  col-sm-12 col-md-6  col-xl-8 products-again"}>
 
      <Productos 
        paginatedData={filteredData}   
        height={height}
      />
   
  </div>
       ) : null}
      { width >850  || width < 850 && openCarrito  ?
        <div  className={ width > 850 ?  ' col-12 col-xl-4 col-sm-12 col-md-6 p-0 w-90 table-position' : ' col-12 col-xl-4 col-sm-12 col-lg-6 p-0 w-90 table-position'} style={{position: 'absolute', top:'102px', right: '0'}}>
        <Tablas
        width={width}
        currentCartItems={currentCartItems}
        setSelectProduct={setSelectProduct}
        combinedProducts={data}
        toggleSelectProduct={toggleSelectProduct}
        selectProduct={selectProduct}
        openCarrito={openCarrito}
        otrosCostos={otrosCostos}
        heightTable={heightTable}
      />
      </div>
     : null }
   </div>  }
         
     <div >
        <Footer 
        footerRef={footerRef} 
        openCarrito={openCarrito}/>
      </div> 
      
    </>
  );
};

export default HomeComponent;
