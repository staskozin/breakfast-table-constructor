// Список декупажных карт
var images = {};
function getImages() {
    $.getJSON('https://stolpodnos.local/catalog/model/extension/module/constructor.php', function(json) {
        images = json;
    });
}


// Дефолтный столик
var table = {};
table.burn = 9;
table.picture = '-';
table.no_picture = 25;
table.render = '-'; // предварительный вид столика (не реализован)
table.quantity = 1;
table.total = 0;


// Рисует выбиралку декупажных карт
// Сделать из этого компонент
// Проходится циклом по data.categories
var selectedImage = 0; // Выбранная декупажная карта (элемент DOM)
function renderImagePicker() {
    $('body').prepend('<div class="spc-popup"><div class="container spc-popup__window"><div class="spc-popup__header"><h1 class="spc-popup__heading">Выберите рисунок</h1></div><div class="spc-popup__content"><div class="spc-image-picker"></div></div>');
    var wrap = $('.spc-image-picker');
    wrap.append('<select name="c-image" class="spc-image-picker__select"></select>');
    var select = $('.spc-image-picker__select');
    images.categories.forEach(function(elem) {
        wrap.append('<div class="spc-image-picker__wrap"></div>');
        var tmp_wrap = $('.spc-image-picker__wrap').last();
        tmp_wrap.append('<h2 class="spc-image-picker__heading">' + elem.name + '</h2>');
        tmp_wrap.append('<div class="spc-image-picker__category row"></div>');
        var category = $('.spc-image-picker__category').last();
        elem.products.forEach(function(elem) {
            category.append('<div class="selectable-image col-md-3 col-sm-4 col-xs-6"><div class="selectable-image__wrap"><img src="' + images.img_dir + elem.url + '" alt="' + elem.url.slice(0, -4) + '" class="selectable-image__image img-responsive"><p class="selectable-image__caption">' + elem.name + '</p></div></div>');
            select.append('<option class="spc-image-picker__item">' + elem.url.slice(0, -4) + '</option>');
        });
    });

    // Вызывает updatePic(), checkPic(), updatePrice()
    // Меняет состояние столика
    $('.selectable-image__wrap').on('click', function() {
        if (selectedImage !== 0)
            selectedImage.removeClass('selectable-image__wrap_selected');
        selectedImage = $(this);
        selectedImage.addClass('selectable-image__wrap_selected');

        $('.spc-image-picker__select').val(selectedImage.children().attr('alt'));

        // Включаем чекбокс 'Без рисунка' и убираем галочку
        $('input[name=c-no-image]').prop('disabled', false);
        $('input[name=c-no-image]').prop('checked', false);

        updatePic();
        checkPic();
        updatePrice();
        table.picture = 'https://stolpodnos.ru' + $('#c-image').attr('src');

        $('.spc-popup').remove();
    });
}


// Добавляет столик в корзину
// Вызывает cart.add()
// Зависит от кода в common.js
function addTable() {
    var data = {};
    // Названия ключей data какие есть, ограничение движка
    data['option[1]'] = Number(table.border);
    data['option[2]'] = Number(table.color);
    if (table.burn !== undefined)
        data['option[3][]'] = table.burn;
    if (table.picture != '-')
        data['option[4]'] = table.picture;
    data['option[5]'] = table.render;
    if (table.no_picture !== undefined)
        data['option[11][]'] = table.no_picture;
    cart.add(532, $('#c-quantity').val(), data);
    console.log(data);
}


// Обновляет параметры столика
// Меняет состояние столика
// Вызывается в updateAll()
function updateTable() {
    table.border = $('input[name=c-border]:checked').val();
    table.color = $('input[name=c-color]:checked').val();
}


// Добавляет пробелы между разрядами
// Чистая функция
// Вызывается в updatePrice()
function formatPrice(price) {
    var res = "";
    if (String(price).length < 5)
      res = String(price);
    else
      for (var i = String(price).length - 1, j = 0; i >= 0; i--, j++) {
          if (j % 3 === 0 && j !== 0) {
              res = ' ' + res; // Это не пустая строка, там есть узкий пробел!
          }
          res = String(price).charAt(i) + res;
      }
    return res;
  }


// Обновляет цены
// Меняет состояние столика
// Вызывается при изменении состояния столика
function updatePrice() {
    // Берет значения цены из верстки
    var borderPrice = Number($('input[name=c-border]:checked').attr('data-price'));
    var colorPrice = Number($('input[name=c-color]:checked').attr('data-price'));
    var noImagePrice = 0;
    if ($('input[name=c-no-image]').prop('checked'))
        // Отрицательная цена!
        noImagePrice = Number($('input[name=c-no-image]').attr('data-price'));

    // Меняем состояние столика
    table.price = borderPrice + colorPrice + noImagePrice;
    table.total = table.price * table.quantity;

    // #c-price - это отображение цены за штуку
    if (table.quantity > 1 && $('#c-price').length === 0)
        $('.horizontal-list__item_price').prepend('<span id="c-price">' + formatPrice(table.price) + ' ₽/шт.</span>');
    else {
        $('#c-price').remove();
        if (table.quantity > 1)
            $('.horizontal-list__item_price').prepend('<span id="c-price">' + formatPrice(table.price) + ' ₽/шт.</span>');
    }
    // Обновляем отображение цены за все столики
    $('#c-total').text(formatPrice(table.total));
}


// Убирает и показывает картинку
// Меняет состояние столика
// Вызывается в updateAll() и renderImagePicker()
function checkPic() {
    if ($('input[name=c-no-image]').prop('checked')) {
        $('.spc-image-wrap__border_'  + table.color + '-' + table.border).css({'opacity': '0'});
        $('#c-image').css({'display': 'none'});
        table.picture = '-';
        table.no_picture = 25; // Бэк принимает только 25 почему-то ¯\_(ツ)_/¯
    }
    else {
        $('.spc-image-wrap__border_'  + table.color + '-' + table.border).css({'opacity': '1'});
        $('#c-image').css({'display': 'block'});
        table.picture = 'http://stolpodnos.ru' + $('#c-image').attr('src');
        table.no_picture = null;
    }
}


// Обновляет картинку
// Меняет отображение рисунка на столике в зависимости от значения 
function updatePic() {
    // $('select[name=c-image]').val() существует только когда на экране выбиралка рисунков!
    $('#c-image').attr('src', '/image/catalog/constructor/pictures/burn/' + $('select[name=c-image]').val() + '.png');
}


// Обновляет превьюшки в радиокнопках и фон
function updateAll() {
    // Убираем старые картинки из радиокнопок бортика
    var basic = $('.c-input__checkmark_' + table.color + '-1');
    basic.removeClass('c-input__checkmark_' + table.color + '-1');
    var grips = $('.c-input__checkmark_' + table.color + '-2');
    grips.removeClass('c-input__checkmark_' + table.color + '-2');
    var tall = $('.c-input__checkmark_' + table.color + '-3');
    tall.removeClass('c-input__checkmark_' + table.color + '-3');
    var fig = $('.c-input__checkmark_' + table.color + '-4');
    fig.removeClass('c-input__checkmark_' + table.color + '-4');
    var tall3 = $('.c-input__checkmark_' + table.color + '-11');
    tall3.removeClass('c-input__checkmark_' + table.color + '-11');
    var fig3 = $('.c-input__checkmark_' + table.color + '-12');
    fig3.removeClass('c-input__checkmark_' + table.color + '-12');
    
    // Прячем картинку столика и бортик с тенью
    $('.spc-image-wrap__back_'  + table.color + '-' + table.border).css({'opacity': '0'});
    $('.spc-image-wrap__border_'  + table.color + '-' + table.border).css({'opacity': '0'});

    // Обновляем состояние столика (бортик и цвет)
    updateTable();

    // Добавляем новые картинки в радиокнопках бортика
    basic.addClass('c-input__checkmark_' + table.color + '-1');
    grips.addClass('c-input__checkmark_' + table.color + '-2');
    tall.addClass('c-input__checkmark_' + table.color + '-3');
    fig.addClass('c-input__checkmark_' + table.color + '-4');
    tall3.addClass('c-input__checkmark_' + table.color + '-11');
    fig3.addClass('c-input__checkmark_' + table.color + '-12');
    $('.spc-image-wrap__back_'  + table.color + '-' + table.border).css({'opacity': '1'});
    
    // Если картинка выбрана, показываем ее и бортик с тенью
    checkPic();
}


$('#c-image-picker-button').on('click', function() {
    renderImagePicker();
});

$('input[name=c-no-image]').on('change', function() {
    updateAll();
    updatePrice();
});

$('input[name=c-border]').on('change', function() {
    updateAll();
    updatePrice();
});

$('input[name=c-color]').on('change', function() {
    updateAll();
    updatePrice();
});

// Меняет кол-во столиков
$('#c-quantity').on('change', function() {
    table.quantity = Number($('#c-quantity').val());
    updatePrice();
});

// Добавляет в корзину
$('#c-submit').on('click', function() {
    addTable(table);
});

$(document).ready(function() {
    getImages();
    updateAll();
    updatePrice();
});
