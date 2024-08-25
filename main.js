const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");
const tumunuSilBtn = document.querySelector(".btn-tumunu-sil");

yeniGorevBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku);
tumunuSilBtn.addEventListener('click', tumunuSil);

function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;

    if (tiklanilanEleman.classList.contains('fa-square-check')) {
        const gorevItem = tiklanilanEleman.closest('.gorev-item');
        gorevItem.classList.toggle('gorev-tamamlandi');
    }

    if (tiklanilanEleman.classList.contains('fa-trash-can')) {
        const gorevItem = tiklanilanEleman.closest('.gorev-item');
        const silinecekGorev = gorevItem.querySelector('.gorev-tanim').innerText;

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Bu görevi geri alamayacaksınız!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'Hayır, iptal et!'
        }).then((result) => {
            if (result.isConfirmed) {
                gorevItem.remove();
                localStorageSil(silinecekGorev);

                Swal.fire(
                    'Silindi!',
                    'Görev başarıyla silindi.',
                    'success'
                );
            }
        });
    }
}

function gorevEkle(e) {
    e.preventDefault();
    if (yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = ''; 
    } else {
        Swal.fire({
            title: 'Boş TODOS olmaz!',
            text: 'Lütfen bir görev girin.',
            icon: 'warning',
            confirmButtonText: 'Tamam'
        });
    }
}

function localStorageKaydet(yeniGorev) {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageOku() {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.forEach(function(gorev) {
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev) {
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);

    const gorevTamamlandiBTN = document.createElement('button');
    gorevTamamlandiBTN.classList.add('gorev-btn');
    gorevTamamlandiBTN.classList.add('gorev-btn-tamamlandi');
    gorevTamamlandiBTN.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    gorevDiv.appendChild(gorevTamamlandiBTN);

    const gorevsilBTN = document.createElement('button');
    gorevsilBTN.classList.add('gorev-btn');
    gorevsilBTN.classList.add('gorev-btn-sil');
    gorevsilBTN.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    gorevDiv.appendChild(gorevsilBTN);

    gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    if (silinecekElemanIndex !== -1) {
        gorevler.splice(silinecekElemanIndex, 1);
        localStorage.setItem('gorevler', JSON.stringify(gorevler));
    }
}

function tumunuSil() {
    Swal.fire({
        title: 'Tüm görevleri silmek istediğinizden emin misiniz?',
        text: "Bu işlemi geri alamazsınız!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'Hayır, iptal et!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('gorevler');
            while (gorevListesi.firstChild) {
                gorevListesi.removeChild(gorevListesi.firstChild);
            }
            Swal.fire(
                'Silindi!',
                'Tüm görevler başarıyla silindi.',
                'success'
            );
        }
    });
}