// for deployment: const baseURL = "herokuapp.com"
const baseURL = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {
  renderPage();
});

const renderPage = () => {
    // this is our .get to heroku-url
    // server has middleware to use /posts for every route
    axios.get(`${baseURL}/posts`)
    .then(allPosts => {
        // if there is data
        console.log('allPosts.data.response: ', allPosts.data.response.response.length)
        if(allPosts.data.response.response.length > 0){
            const blog = document.querySelector('#blog');
            const listGroup = document.querySelector('.list-group');
            blog.style.display = 'block';

            allPosts.data.response.response.forEach((post, index) => {
                let anchor = document.createElement('a');
                anchor.classList.add("list-group-item", "list-group-item-action");
                anchor.setAttribute('href', `#/posts/${post.id}`);
                anchor.textContent = post.title;
                anchor.addEventListener('click', showPost);
                // console.log('anchor', anchor);
            
                if (index === 0) {
                    console.log("you are inside the if-block")
                    anchor.classList.add('active');
                    let blogTitle = document.querySelector('#blog-title');
                    let blogContent = document.querySelector('#blog-content');
                    let updatePost = document.querySelector('#edit-post');
                    let deletePost = document.querySelector('#delete-post');
                    
                    blogTitle.textContent = post.title;
                    blogContent.textContent = post.content;

                    updatePost.href = `#/posts/${post.id}`;
                    deletePost.href = `#/posts/${post.id}`;
                }

                listGroup.appendChild(anchor);
            });
        }
    })
};

const showPost = (aTag) => { 
    console.log('aTag: ', aTag);
    document.querySelector('#sidebar').querySelector('.active').classList.remove('active');

    const alert = document.querySelector('.alert');
    const postView = document.querySelector('#post-form');
    const updateView = document.querySelector('#update-form');
    const blog = document.querySelector('#blog');
    alert.style.display = 'none';
    postView.style.display = 'none';
    updateView.style.display = 'none';
    blog.style.display = 'block';

    let sidebarTab = aTag.target;
    sidebarTab.classList.add('active');
    let url = sidebarTab.href.split('posts/');
    let id = url[1];

    axios.get(`${baseURL}/posts/${id}`)
  .then(result => {
    let blogTitle = document.querySelector("#blog-title");
    let blogContent = document.querySelector("#blog-content");
    let updatePost = document.querySelector("#edit-post");
    let deletePost = document.querySelector("#delete-post");

    // add first post title and content to view title and content
    blogTitle.textContent = result.data.result.title;
    blogContent.textContent = result.data.result.content;
    updatePost.href = `#/posts/${result.data.result.id}`;
    deletePost.href = `#/posts/${result.data.result.id}`;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
};