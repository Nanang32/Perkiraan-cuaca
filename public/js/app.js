console.log('client side javasript file loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pesanSatu = document.querySelector('#pesan-1')
const pesanDua = document.querySelector('#pesan-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    pesanSatu.textContent = 'Loading....'
    pesanDua.textContent = ''
    fetch('http://localhost:3000/weather?alamat=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                pesanSatu.textContent = data.error

            } else {
                pesanSatu.textContent = data.location
                pesanDua.textContent = data.forecast
            }
        })
    })

})