
const form = document.getElementById('frm_books');
const display = document.getElementById('display');

const saveBooks = (data) => {
  const strData = JSON.stringify(data);
  localStorage.setItem('data', strData);
}

let catalog = {};

const restoreBooks = () => {
  const data = localStorage.getItem('data');
  const objData = JSON.parse(data);
  catalog = objData || {};
}

const displayData = (k) => {
  const bookParent = document.createElement('div');
  bookParent.classList.add(`parent-${k}`);
  bookParent.classList.add('book-parent');
  bookParent.innerHTML += catalog[k].title;
  bookParent.innerHTML = `${bookParent.innerHTML}<br>${catalog[k].author}`;
  bookParent.innerHTML = `${bookParent.innerHTML}<br> <button id="${k}"> Remove </button>`;
  display.appendChild(bookParent);
  saveBooks(catalog);
}

function removeBook(a) {
  const remove = document.getElementById(a);
  if (remove) {
    remove.addEventListener('click', function removeContent(event) {
      const button = event.target;
      const parent = button.parentNode;
      parent.parentNode.removeChild(parent);
      delete catalog[this.id];
      saveBooks(catalog);
    });
  }
}

let i = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = {};
  book.title = form.elements.title.value;
  book.author = form.elements.author.value;
  form.elements.title.value = '';
  form.elements.author.value = '';
  catalog[i] = book;
  displayData(i);
  removeBook(i);
  i += 1;
});

window.addEventListener('load', () => {
  restoreBooks();
  const keys = Object.keys(catalog);
  for (let i = 0; i < keys.length; i += 1) {
    displayData(keys[i]);
    removeBook(keys[i]);
  }
});

const updateClock = () => {
  var now = new Date();
  var dname = now.getDate(),
    mo = now.getMonth(),
    dnum = now.getDate(),
    yr = now.getFullYear(),
    hou = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    pe = "AM";

    if(hou == 0){
      hou = 12;
    }
    if(hou > 12){
      hou = hou - 12;
      pe = "PM";
    }

    Number.prototype.pad = function(digits){
      for(var n = this.toString(); n.length < digits; n = 0 + n);
      return n;
    }

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octaber", "November", "December"];
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Suturday"];
  var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
  var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
  for(var i = 0; i < ids.length; i++)
  document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1)
}
