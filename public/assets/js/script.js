
const contentDiv = document.getElementById('content')
const title = document.getElementById('blog_title')
const updateDiv = document.getElementById('update_section')
const tsAllDiv = document.getElementById("ts_all")

async function getPosts(url){
    const response = await fetch('./api/posts');
    var posts = await response.json();
    
    let blogs = new displayBlogs(posts)
}


class displayBlogs{
    constructor(data){
        this.data = data
        this.blogDiv

        this.displayBlog(this.data)
    }

    displayBlog(data){
        data.forEach((post) =>{
            if (post.title){
                this.printBlog(post.id, post.title, post.body)
                // title.innerHTML= post.title
            }
        
        })
    }

    printBlog(id , title, decription_p, body){

        this.blogDiv = document.createElement('div')
        this.blogDiv.classList.add('blog', 'mt-4', 'mb-4')
        contentDiv.appendChild(this.blogDiv)

        let h2 = document.createElement('h2')
        h2.classList.add('mb-0')
        this.blogDiv.appendChild(h2)

        let h2_a = document.createElement('a')
        h2_a.id = 'blog_title'
        h2_a.innerHTML = title
        h2.appendChild(h2_a)

        // let date = document.createElement('a')
        // date.classList.add('text-muted', 'mb-3')
        // date.innerHTML = 'July 27, 2022'
        // this.blogDiv.appendChild(date)

        let thumbnail = document.createElement('div')
        thumbnail.classList.add('thumbnail', 'mb-2')
        this.blogDiv.appendChild(thumbnail)

        let thumbnail_img = document.createElement('img')
        thumbnail_img.src = './assets/images/placeholder.jpg'
        thumbnail.appendChild(thumbnail_img)

        let description = document.createElement('div')
        description.classList.add('description')
        this.blogDiv.appendChild(description)

        let desc_p = document.createElement('p')
        desc_p.innerHTML = decription_p
        description.appendChild(desc_p)


        let buttons = document.createElement('div')
        buttons.classList.add('buttons')
        this.blogDiv.append(buttons)

        // let btn_p = document.createElement('a')
        // btn_p.classList.add('btn', 'btn-primary')
        // btn_p.innerHTML = 'Read More'
        // btn_p.href = '#'
        // buttons.appendChild(btn_p)

        let btn_i = document.createElement('a')
        btn_i.classList.add('btn', 'btn-info')
        btn_i.innerHTML = 'Edit'
        btn_i.href = '#'
        buttons.appendChild(btn_i)

        btn_i.addEventListener('click', (() =>{
            this.editPost(id)
        }).bind(this))

        let btn_d = document.createElement('a')
        btn_d.classList.add('btn', 'btn-danger')
        btn_d.innerHTML = 'Delete'
        btn_d.id = `${id}`
        btn_d.href = '#'

        btn_d.addEventListener('click', (() =>{
            this.deletePost(id)
        }).bind(this))

        buttons.appendChild(btn_d)
    }

    async deletePost(id){
        const response = await fetch(`./api/post/${id}`, {
            method: 'DELETE', 
            })
         .then(window.location.href = '/')
         .catch(console.log);
    }

    async editPost(id){
        contentDiv.style.display = 'none'
        tsAllDiv.style.display = 'none'
        updateDiv.style.display = 'block'

        preLoadFields(id)
        
    }
}

window.onload = getPosts()