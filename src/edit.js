document.querySelector('#edit-post').addEventListener('click', (event) => {
    const blog = document.querySelector('#blog');
    const updateView = document.querySelector('#update-form');

    // hide blog window and show the create a post form
    blog.style.display = 'none';
    updateView.style.display = 'inline';

    // find id from href in edit link
    let url = envent.target.split('/posts/');
    let id = url[id];

    // get post by id
    axios.get(`${baseURL}/posts/${id}`)
    .then(response => {
        const updateTitle = updateView.querySelector('#update-title');
        const updateContent = updateView.querySelector('#update-content');
        
        // assign existing data to title and content
        updateTitle.value = response.data.response.title;
        updateContent.value = response.data.response.content;
    })
    .catch(error => {
        console.log(error.response.data.error);
    });
})

document.querySelector('#update-button').addEventListener('click', (event) => {
    const updateView = document.querySelector('#update-form');
    const updateTitle = updateView.querySelector('#update-title');
    const updateContent = updateView.querySelector('#update-content');

    // find id from href
    let url = window.location.href.split('/posts/');
    let id = url[id].split('/edit')[0];

    // update existing post with new title and content
    axios.put(`${baseURL}/posts/${id}`, {
        title: updateTitle.value,
        content: updateContent.value
    })
    .then(response => {
        let alert = document.querySelector('.alert');
        // make the form and alert display none when a new post is created
        alert.style.dispaly = 'none';
        updateView.style.display = 'none';

        // reload page to get new content to show
        location.assign('index.html');
    })
    .catch(error => {
        // error response
        let alert = document.querySelector('.alert');
        const response = error.response.data.error;

        // apply error messages to alert text content
        alert.textContent = response.message;
        response.errors.forEach(error, index, array => {
            if (index == array.length - 1) alert.textContent += `${error}`;
            else alert.textContent += `${error}, `;
        })
        alert.style.display = 'block';
    });
});