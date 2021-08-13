
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
message1.textContent= 'test'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.erorr) {
            console.log(data.erorr)
        } else {
            prR = {
                location,
                tempreature: data.tempreature - 273.15
            }
            console.log(prR)
    
        }
    })
    })
 })
