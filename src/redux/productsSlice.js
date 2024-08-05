import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    products: [],
    currentPage:1,
    status: "start",
    error: "",
    totalPage: 30,

}
const url = "https://66a8534f53c13f22a3d25bb3.mockapi.io/product"
export const fetchProucts= createAsyncThunk('cats/fetchProucts', async (page)=>{
    const res = await axios.get(`${url}?page=${page}&&limit=8`)
    return res.data;
})
export const deleteCat=createAsyncThunk('cats/deleteCat', async (id)=>{
    await axios.delete(url+'/'+id)
    return id;
})
export const addNewCat=createAsyncThunk('cats/addNewCat', async(cat)=>{
    const res = await axios.post(url,cat);
    return res.data
})
export const reCheckCat=createAsyncThunk('cats/reCheckCat', async(cat)=>{
    const res=await axios.put(url+"/"+cat.id, {...cat, checked:!cat.checked})
    return res.data;
})
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProucts.pending, state=>{
                state.status = "loading"
            })
            .addCase(fetchProucts.fulfilled, (state, action)=>{
                state.status = "succeeded"
                state.products = action.payload;
                console.log(state.products)
            })
            .addCase(fetchProucts.rejected, (state,action)=>{
                state.status = "failed"
                state.error = action.error.message;
            })
            .addCase(deleteCat.fulfilled, (state, action)=>{
                state.cats = state.cats.filter(item=>item.id !== action.payload)
            })
            .addCase(addNewCat.fulfilled, (state, action)=>{
                state.cats = [...state.cats, action.payload]
            })
            .addCase(reCheckCat.fulfilled, (state, action)=>{
                state.cats = state.cats.map(item=>item.id===action.payload.id?{...item, checked:!item.checked}:item)
            })
    }
})

export default productsSlice.reducer;