// **** DOM ELEMENTS ****

const urlUsers = "http://localhost:3000/users"
const urlBooks = "http://localhost:3000/books"
const listPanel = document.querySelector("div#list-panel")
const ulList = document.querySelector('ul#list')
const showPanel = document.querySelector('div#show-panel')
const likeButton = document.querySelector('button.like-button')


// **** EVENT HANDLERS ****

listPanel.addEventListener('click', function(event) {
    if(event.target.matches('li'))
    id = event.target.dataset.id
    getOneBook(id)
})

showPanel.addEventListener('click', function(event) {
    if(event.target.matches('button'))
    id = event.target.dataset.id 
    let userId = 1
    oneBookInfo(id, userId)
    // addLike(id)
})
// **** RENDER FUNCTIONS ****

function renderBooksList(bookObj) {
    let li = document.createElement('li')
    li.dataset.id = bookObj.id 
    li.textContent = bookObj.title 
    ulList.append(li)
}

function renderOneBook(bookObj) {
    showPanel.innerHTML = ``
    let img = document.createElement('img')
    let h3Title = document.createElement('h3')
    let h3Subtitle = document.createElement('h3')
    let h3Author = document.createElement('h3')
    let pDesc = document.createElement('p')
    let userLikes = document.createElement('ul')
    let button = document.createElement('button')

    button.dataset.id = bookObj.id 

    h3Author.classList.add('author')
    h3Title.classList.add('title')
    h3Subtitle.classList.add('subtitle')
    img.classList.add('image')
    pDesc.classList.add('description')
    button.classList.add('like-button')
    userLikes.classList.add('user-likes')

    img.src = bookObj.img_url 
    img.alt = bookObj.title 

    h3Title.textContent = bookObj.title 
    h3Subtitle.textContent = bookObj.subtitle 
    h3Author = bookObj.author 
    pDesc.textContent = bookObj.description 

    bookObj.users.forEach(user => {
        let li = document.createElement('li')
        li.textContent = user.username
        li.dataset.id = user.id 
        userLikes.append(li)
    })

    button.textContent = "LIKE"
    showPanel.append(img, h3Title, h3Subtitle, h3Author, pDesc, userLikes, button)
}

// function addLike(id) {
//     debugger
//     let newLikeObj = {
//         id: 1,
//         username: "pouros"
//     }
//     postNewLike(id, newLikeObj)
// }

// **** FETCH FUNCTIONS *****

function getBooksList() {
    fetch(urlBooks)
    .then(res => res.json())
    .then(booksArray => {
        booksArray.forEach(bookObj => {
            renderBooksList(bookObj)
        });
    })
}

function getOneBook(id) {
    fetch(`${urlBooks}/${id}`)
    .then(res => res.json())
    .then(bookObj => {
        showPanel.innerHTML = ""
        renderOneBook(bookObj)
    })
}

function postNewLike(id, newLikeObj) {
    fetch(`${urlBooks}/${id}`, {
    method: 'PATCH', 
    headers: {"Content-Type": 'application/json', 
},
    body: JSON.stringify({users: newLikeObj})
})
.then(res => res.json())
.then(updatedLikes => {
    renderOneBook(updatedLikes)
})
}

function getUsers(id) {
    return fetch(`${urlUsers}/${id}`)
    .then(res => res.json())
    .then(user => {
        console.log(user)
        })
}

function oneBookInfo(id, user) {
        fetch(`${urlBooks}/${id}`)
        .then(res => res.json())
        .then(bookObj => {
        newUser = {id: 1, username: "pouros"}
        console.log(newUser)
        newUserLikes = bookObj.users
        newUserLikes.push(newUser)
        // debugger
            postNewLike(id, newUserLikes)
        })
}


// ***** INITIAL RENDER ****

document.addEventListener("DOMContentLoaded", function(event) {
    getBooksList()
})