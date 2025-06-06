const API_BASE_URL = 'http://localhost:3001/api'


//GET POSTS API
export const getPosts = async(queries = '') => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts?${queries}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR TO FETCH POSTS',response.status)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR FETCH POSTS',error);
        throw error;
    }
}
//CREATE POST API
export const createPost = async(postData)=>{
    const {title,content,isPublished,file,tag} = postData;
    const formData = new FormData();
    formData.append("title",title);
    formData.append("content",content);
    formData.append("file",file ? file[0] : "");
    formData.append('tag',tag)
    formData.append("isPublished",isPublished ? "true" : "false");
    try {
        const response = await fetch(`${API_BASE_URL}/posts/create`,{
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR FETCH CREATING POST',response.status,errorData?.message)
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('ERROR CREATE POST',error);
        throw error;
    }
}
//DELETE POST API
export const deletePost = async(postId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${parseInt(postId)}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR FETCH DELETE POST',response.status,errorData?.message)
        }
        console.log('this is data: ')
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR DELETE POST',error);
        throw error;
    }
}
//EDIT POST API

export const editPost = async(postData) => {    
    const {title,content,isPublished,file,tag,post_id} = postData;
    const formData = new FormData();
    formData.append("title",title);
    formData.append("content",content);
    formData.append("file",file ? file[0] : "");
    formData.append('tag',tag)
    formData.append("isPublished",isPublished ? "true" : "false");
    try {
        const response = await fetch(`${API_BASE_URL}/posts/edit/${post_id}`,{
            method: 'PUT',
            body: formData,
            credentials: 'include'
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR FETCH EDITING POST', response.status, errorData?.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR EDIT POST', error);
        throw error;
    }
}

//HANDLE isPublished post state