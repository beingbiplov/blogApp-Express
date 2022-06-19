
const updateBtn  = document.getElementById('blogupdate')
let blogId

let preLoadFields = async (id) =>{
    let title = document.getElementById('title')
    let body = document.getElementById('body')
    blogId = id
    let post

    const response = await fetch(`./api/post/${id}`, {
            method: 'GET', 
            })
         .then(response => response.json())
         .then(data => post = data)
         .catch(console.log);
    
    title.value = post.title
    body.value = post.body
}


async function updateData(url = '', data = {}) {
  
  const response = await fetch(url, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    },  body: JSON.stringify(data) 
  });
  return response.json()
}


updateBtn.addEventListener('click', () =>{
    let title = document.getElementById('title').value
    let body = document.getElementById('body').value
    let data = {
        "title" : title,
        "body" : body,
    }
    updateData(`/api/post/${blogId}`, data)
    .then(window.location.href = '/')

})
