async function postData(url = '', data = {}) {
  
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    },  body: JSON.stringify(data) 
  });
  return response.json()
}




const blogSubmit = document.getElementById('blogsubmit')

blogSubmit.addEventListener('click', ()=>{
    let title = document.getElementById('title').value
    let body = document.getElementById('body').value
    let data = {
        "title" : title,
        "body" : body,
    }
    
    postData('/api/posts', data)
    .then(window.location.href = '/')
})