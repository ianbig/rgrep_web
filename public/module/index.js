function sendQuery() {

    let data = document.getElementById('go').value;
    data = data.replace(' ',',');
    const url = "http://localhost:3000/file?value=" + data;
    console.log(url);
    fetch(url, {
        method: 'POST',
    }).then( (response) => {
        window.location.replace('http://localhost:3000/page.html');
        console.log(response)
    } )
    .catch( (err) => console.log(err));
}


document.getElementById('searchForm').addEventListener('submit', () => {
    sendQuery();
});

export {sendQuery};