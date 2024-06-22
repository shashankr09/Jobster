const addToLocalStorage=(key,value)=>{
    localStorage.setItem(key,value);
}

const removeFromLocalStorage=(key,value)=>{
    localStorage.removeItem(key);
}

const getDataFromLocalStorage=(key,value)=>{
    const res=localStorage.getItem(key);
    return res;
}

export {addToLocalStorage,removeFromLocalStorage,getDataFromLocalStorage};