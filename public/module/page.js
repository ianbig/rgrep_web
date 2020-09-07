import {sendQuery} from './index.js'


var index = 0;

function buildContent(urlarr, bodyarr, titlearr) {
    let container = document.getElementById('lower-body');
    var i;
    let record;
    let title;
    let url;
    let body;
    let tmpArr = [];
    let aTag;

    for( i = index; i < index + 10; i++) {
        record = document.createElement('div');
        record.setAttribute('class', 'rec');
        title = document.createElement('div');
        title.setAttribute('class', 'title');
        aTag = document.createElement('a');
        url = document.createElement('div');
        url.setAttribute('class', 'url')
        body = document.createElement('div');
        body.setAttribute('class', 'body');
        tmpArr = removeRedundant(titlearr[i], urlarr[i], bodyarr[i]);
        aTag.textContent = tmpArr[0];
        url.textContent = tmpArr[1];
        aTag.setAttribute('href', url.textContent);
        body.textContent = tmpArr[2].substring(0, 200);
        title.append(aTag);
        record.append(title);
        record.append(url);
        record.append(body);
        container.append(record);
    }
}


function removeRedundant(title, url, body) {
    let tmpArr = [];
    title = title.replace('@title:','');
    url = url.replace('@url:', '');
    body = body.replace('@body:','');
    tmpArr.push(title);
    tmpArr.push(url);
    tmpArr.push(body);
    return tmpArr;
}


function showContent() {
    const url = 'http://localhost:3000/record';
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        return response.json();      
    }).then((result) => {
        buildContent(result['url'][0], result['body'][0], result['title'][0]); 
        // because of their type -> array in 0 column
    }).catch( (err) => console.log(err));
}

function buildTable(num) {
    let pageNum = 0;
    // create foot table beneath footer
    let tcontainer = document.getElementById('table');
    let pages;
    let pageContent = 0;
    
    if(num != 0) {
        let body = document.getElementById('lower-body');
        let child = tcontainer.firstElementChild;
        let content = body.firstElementChild;

        while(content) {
            body.removeChild(content);
            content =  body.firstElementChild;
        }
        while(child) {
            tcontainer.removeChild(child);
            child = tcontainer.firstElementChild;
        }
    }

    if(index != 0) {
        pageContent  = ( index - 1 ) / 10;
        if(pageContent > 3) pageContent = pageContent - 3;
        else if( pageContent == 1 ) pageContent -= 1;
    }


    // how to add element to html
    for(let i = pageContent + 1; i <  pageContent + 6; i++) {
        //if(askRecordLength(i)) break;
        pages = document.createElement('td');
        let number = document.createElement('a');
        // how to calculate number
        console.log(i);
        pageNum = i;
        number.innerHTML = pageNum // 10 record one page
        number.setAttribute('href', 'page.html');
        number.setAttribute('id', pageNum);
        pages.append(number);
        tcontainer.append(pages);
        document.getElementById(pageNum).addEventListener('click', (e) => {
            e.preventDefault();
            index = ( (event.target.id - 1 ) * 10) + 1; // because table number has plus one if not minus one 10 of record will disappear
            showContent();
            buildTable(1);
        });
    }
}



window.onload = function () {
    // show information out
    showContent();
    // listen to the form
    buildTable(0);  
}
