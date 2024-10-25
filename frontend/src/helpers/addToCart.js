import { toast } from "react-toastify";
import SummaryApi from "../common";

const addToCart = async(e,id) => {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : "include",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            productId : id
        })
    })

    const responseData = await response.json()

    if(responseData?.success){
        toast.success(responseData?.message)
    }

    if(responseData?.error){
        toast.error(responseData?.message)//ty coi lai
    }

    return responseData

}
export default addToCart