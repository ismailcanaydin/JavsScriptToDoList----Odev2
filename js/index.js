const LISTDOM = document.querySelector('#list')
const TASKDOM = document.querySelector('#task')

function checked(event) {
    const item = event.target
    // toggle seçme ve seçimi geri almak için kullanıldı
    item.classList.toggle("checked")
}

// SEÇİLİ İŞİ SİLME
function removeElement(e) {
    const item = e.target.parentElement
    item.remove()
    dltStorage(e.target.parentElement.innerText)
}

// SAYFA YÜKLENDİĞİNDE LOCALSTORAGE'DEKİLERİ ÇEKMEK İÇİN
function startConf() {
    let todo = JSON.parse(localStorage.getItem("todo"))

    if (!todo) {
        localStorage.setItem("todo", JSON.stringify([]))
    } else {
        todo.forEach(todo => {
            addHTML(todo)
        });
    }
}

// LOCALSTORAGE DAKİ VERİLERİN HTML İ Nİ OLUŞTURMAK İÇİN
function addHTML(todo) {
    //console.log("tıklandı")

    // li ekle
    const newLi = document.createElement('li')
    newLi.addEventListener("click", checked);
    newLi.innerHTML = todo

    LISTDOM.appendChild(newLi)

    // X butonu ekle
    const newI = document.createElement('i')
    //newI.innerHTML = "&times;"
    newI.classList.add("close", "fa-solid", "fa-xmark")
    newI.addEventListener("click", removeElement)
    newLi.appendChild(newI)
}

// YENİ İŞ EKLEMEK İÇİN UL>LI ELEMANI OLUŞTUR
function newElement() {
    //console.log("tıklandı")

    if (TASKDOM.value === " ") {
        $(".error").toast("show")
        TASKDOM.value = ""
    } else if (TASKDOM.value === "") {
        $(".error").toast("show")
        TASKDOM.value = ""
    } else if (TASKDOM.value != "") {
        // li ekle
        const newLi = document.createElement('li')
        newLi.addEventListener("click", checked);
        newLi.innerText = TASKDOM.value
        LISTDOM.appendChild(newLi)

        // X butonu ekle
        const newI = document.createElement('i')
        //newI.innerHTML = "&times;"
        newI.classList.add("close", "fa-solid", "fa-xmark")
        newI.addEventListener("click", removeElement)

        newLi.appendChild(newI)

        // yeni eklenen iş verisini loadStorage foksiyonuna gönder
        loadStorage(TASKDOM.value)

        TASKDOM.value = ""
        // class'ı success olan elementi getir ve toast ile class'ına show'u ekle
        $(".success").toast("show")
    }
}

// VERİYİ LOCALSTORAGE'A KAYDET
function loadStorage(text) {
    let str = JSON.parse(localStorage.getItem("todo"))
    let todo;
    if (str == null) {
        //localStorage da "todo" key ve "[]" valusu yoksa oluşturma
        todo = []
    } else {
        todo = JSON.parse(localStorage.getItem("todo"))
    }

    todo.push(text)

    localStorage.setItem("todo", JSON.stringify(todo))
}

// İŞİ LOCALSTORAGE DAN SİLME
function dltStorage(text) {
    let todo = JSON.parse(localStorage.getItem("todo"))

    // silmek için seçilen iş ile listedeki işi arayıp buluyor
    todo.forEach((element, id) => {
        if (element === text) {
            todo.splice(id, 1);
        }
    })

    localStorage.setItem("todo", JSON.stringify(todo));
}

startConf();
