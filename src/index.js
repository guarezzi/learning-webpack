import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

let itens = [];

function newItem(id, col1, col2, col3, col4) {
    return {id,col1,col2,col3,col4};
}

itens.push(newItem('1, 001','Lorem','ipsum','dolor','sit'));
itens.push(newItem('1, 002','amet','consectetur','adipiscing','elit'));
itens.push(newItem('1, 003','Integer','nec','odio','Praesent'));
itens.push(newItem('1, 003','libero','Sed','cursus','ante'));
itens.push(newItem('1, 004','dapibus','diam','Sed','nisi'));
itens.push(newItem('1, 005','Nulla','quis','sem','at'));
itens.push(newItem('1, 006','nibh','elementum','imperdiet','Duis'));
itens.push(newItem('1, 007','sagittis','ipsum','Praesent','mauris'));
itens.push(newItem('1, 008','Fusce','nec','tellus','sed'));
itens.push(newItem('1, 009','augue','semper','porta','Mauris'));
itens.push(newItem('1, 010','massa','Vestibulum','lacinia','arcu'));
itens.push(newItem('1, 011','eget','nulla','Class','aptent'));
itens.push(newItem('1, 012','taciti','sociosqu','ad','litora'));
itens.push(newItem('1, 013','torquent','per','conubia','nostra'));
itens.push(newItem('1, 014','per','inceptos','himenaeos','Curabitur'));
itens.push(newItem('1, 015','sodales','ligula','in','libero'));

function populateTable() {
    let myTable = document.getElementById('my-table');
    if(!myTable)
        return console.error('table not found!');
    let tbody = document.createElement('tbody');
    populateTbody(tbody);
    myTable.append(tbody);
}

function populateTbody(tbody) {
    itens.forEach(item => {
        let tr = document.createElement('tr');
        populateTr(tr, item);
        tbody.append(tr);
    });
}

function populateTr(tr, item) {
    for (let key in item) {
        tr.append(createTd(item[key]));
    }
}

function createTd(content) {
    let td = document.createElement('td');
    td.textContent = content;
    return td;
}


window.onload = populateTable;