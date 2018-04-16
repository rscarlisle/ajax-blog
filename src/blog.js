// for deployment: const baseURL = "herokuapp.com"
const baseURL = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {
  renderPage();
});

const renderPage = () => {
    // this is our .get to heroku-url
    // server has middleware to use /posts for every route
    const dqs = document.querySelector;
    axios.get(`${baseURL}/posts`)
    .then(allPosts => {
        // if there is data
        if(allPosts.data.result.length > 0){
            const blog = dqs('#blog');
            const listGroup = dqs('.list-group');
            blog.style.display = 'block';
        }
    })
};

const showPost = (aTag) => { 

};