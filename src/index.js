const url = "http://localhost:3000/quotes?_embed=likes"
const form = document.querySelector("form#new-quote-form")
let ul = document.querySelector("ul#quote-list")
 
function eachQuote(quote) {
let li = document.createElement("li")
    li.className = "quote-card"
let blockquote = document.createElement("blockquote")
    blockquote.className = "blockquote"
let p = document.createElement("p")
    p.className = "mb-0"
    p.innerText = quote.quote
let footer = document.createElement("footer")
    footer.className = "blockquote-footer"
    footer.innerText = quote.author
let btnLikes = document.createElement("button")
    btnLikes.innerText = "Likes: "
    btnLikes.className = "btn-success"
let likespan = document.createElement("span")
    likespan.innerText = quote.likes.length
let btnDelete = document.createElement("button")
    btnDelete.innerText = "Delete"
    btnDelete.className = "btn-danger"

btnDelete.addEventListener("click", () => {
    fetch("http://localhost:3000/quotes/" +quote.id, {
            method: "DELETE"
        })
        .then(() => li.remove())
})

btnLikes.addEventListener("click", (e) => {
    e.preventDefault()
    let likeNumber = parseInt(event.target.children[0].innerText)
    event.target.children[0].innerText = likeNumber +=1
    fetch("http://localhost:3000/likes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            quoteId: quote.id
        })
    })
    .then(res => res.json())
    

    

})




ul.append(li)
li.append(blockquote)
blockquote.append(p, footer, btnLikes, btnDelete)
btnLikes.append(likespan)
}

fetch(url)
.then(res => res.json())
.then(quotes => allTheQuotes(quotes))

function allTheQuotes(quotes) {
    quotes.forEach(quote => eachQuote(quote))
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let newQuote = e.target[0].value 
    let newAuthor = e.target[1].value 

    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            quote: newQuote,
            author: newAuthor,
            likes: []
        })
    })
    .then(res => res.json())
    .then(newone => eachQuote(newone))
})