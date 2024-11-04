document.querySelector('.card-number-input').oninput = () => {
  document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () => {
  document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () => {
  document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () => {
  document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () => {
  document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
  document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () => {
  document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
  document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () => {
  document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}


// Tüm input elementlerini seçme
const cardNumberInput = document.querySelector('.card-number-input');
const cardHolderInput = document.querySelector('.card-holder-input');
const monthInput = document.querySelector('.month-input');
const yearInput = document.querySelector('.year-input');
const cvvInput = document.querySelector('.cvv-input');
const form = document.querySelector('#card-form');

// Kart numarası formatlaması
cardNumberInput.addEventListener('input', function(e) {
    // Sadece rakam girişine izin verme
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // 4'lü gruplar halinde formatlama
    let cardNumber = this.value;
    let formattedNumber = cardNumber.match(/.{1,4}/g)?.join(' ') || '';
    
    // Kart görselini güncelleme
    document.querySelector('.card-number-box').innerText = 
        formattedNumber || '#### #### #### ####';
});

// Kart sahibi adı formatlaması
cardHolderInput.addEventListener('input', function(e) {
    // Özel karakterleri ve rakamları engelleme
    this.value = this.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '');
    
    // Birden fazla boşluğu tek boşluğa çevirme
    this.value = this.value.replace(/\s+/g, ' ');
    
    // Her kelimenin ilk harfini büyük yapma
    this.value = this.value.replace(/\b\w/g, char => char.toUpperCase());
    
    // Kart görselini güncelleme
    document.querySelector('.card-holder-name').innerText = 
        this.value || 'Ad Soyad';
});

// Ay seçimi
monthInput.addEventListener('change', function() {
    document.querySelector('.exp-month').innerText = 
        this.value || 'AA';
});

// Yıl seçimi
yearInput.addEventListener('change', function() {
    document.querySelector('.exp-year').innerText = 
        this.value || 'YY';
});

// CVV işlemleri
cvvInput.addEventListener('input', function() {
    // Sadece rakam girişine izin verme
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Kart görselini güncelleme
    document.querySelector('.cvv-box').innerText = this.value;
});

// Kart çevirme animasyonları
cvvInput.addEventListener('mouseenter', function() {
    document.querySelector('.front').style.transform = 
        'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 
        'perspective(1000px) rotateY(0deg)';
});

cvvInput.addEventListener('mouseleave', function() {
    document.querySelector('.front').style.transform = 
        'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 
        'perspective(1000px) rotateY(180deg)';
});

// Form gönderimi
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini toplama
    const formData = {
        cardNumber: cardNumberInput.value.replace(/\s/g, ''),
        cardHolder: cardHolderInput.value,
        expiryMonth: monthInput.value,
        expiryYear: yearInput.value,
        cvv: cvvInput.value
    };
    
    // Basit validasyon
    if (formData.cardNumber.length !== 16) {
        alert('Lütfen geçerli bir kart numarası giriniz!');
        return;
    }
    
    if (formData.cvv.length !== 3) {
        alert('Lütfen geçerli bir CVV giriniz!');
        return;
    }
    
    // Form verilerini console'a yazdırma (test için)
    console.log('Form verileri:', formData);
    
    // Başarılı mesajı
    alert('Kart bilgileri başarıyla kaydedildi!');
    
    // Formu sıfırlama
    this.reset();
    
    // Kart görselini sıfırlama
    document.querySelector('.card-number-box').innerText = '#### #### #### ####';
    document.querySelector('.card-holder-name').innerText = 'Ad Soyad';
    document.querySelector('.exp-month').innerText = 'AA';
    document.querySelector('.exp-year').innerText = 'YY';
    document.querySelector('.cvv-box').innerText = '';
});