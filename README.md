# Описание
- Цена за штуку
- Кол-во
- Общая цена = цена за штуку * кол-во
- Цвет
  - Натуральный
  - Светлый
  - Орех
  - Венге
  - Белый
- Бортик
  - Без ручек
  - С ручками
  - Высокий
  - Три высоких
  - Фигурный
  - Три фигурных
- Рисунок
  - Выбран
  - Ссылка


# Компоненты
- Constructor
  - TableInfo
  - TableView
  - ColorPicker
  - BorderPicker
  - PicturePicker
  - PicturePickerWindow

## Constructor
Хранит состояние

## TableInfo
Отображает цену, кол-во и кнопку «Заказать»

## TableView
Отображает внешний вид столика

## ColorPicker и BorderPicker
Отображают радиокнопки с вариантами

## PicturePicker
Отображает:\
Чекбокс «Без рисунка»\
Кнопку «Выбрать рисунок», вызывающую окно

## PicturePickerWindow
Отображает окно выбора рисунка


# Состояние приложения
```js
{
  "table": {
    "price": 0,
    "quantity": 1,
    "totalPrice": 0,
    "color": color_id,
    "border": border_id,
    "picture": picture_url,
    "withoutPicture": true
  },

  "picturePicker": {
    "categories": {
      "Вино": [
        {
          "id": 1,
          "name": "Бокал вина",
          "url": "1_2.jpg"
        }
      ]
    },
    "price": 600,
    "isOpen": false
  },
  
  "colorPicker": {
    "imagesPath": "/image/catalog/constructor/color-preview/",
    "colors": [
      {
        "id": 13,
        "name": "Натуральный",
        "price": -450
      },
      {
        "id": 5,
        "name": "Светлый",
        "price": -150
      },
      {
        "id": 6,
        "name": "Орех",
        "price": 0
      },
      {
        "id": 8,
        "name": "Венге",
        "price": 0
      },
      {
        "id": 15,
        "name": "Белый",
        "price": 300
      }
    ]
  },

  "borderPicker": {
    "imagesPath": "/image/catalog/constructor/border-preview/",
    "borders": [
      {
        "id": 1,
        "name": "Без ручек",
        "price": 1950
      },
      {
        "id": 2,
        "name": "С ручками",
        "price": 2250
      },
      {
        "id": 3,
        "name": "Высокий",
        "price": 2850
      },
      {
        "id": 11,
        "name": "Три высоких",
        "price": 2850
      },
      {
        "id": 4,
        "name": "Фигурный",
        "price": 3150
      },
      {
        "id": 12,
        "name": "Три фигурных",
        "price": 3150
      }
    ]
  }
}
```


# Действия

## DOWNLOAD_DATA
Получает с сервера инфу о цветах, бортиках и рисунках

## CHOOSE_COLOR
Выбор цвета. Меняет table.color, пересчитывает цену

## CHOOSE_BORDER
Выбор бортика. Меняет table.border, пересчитывает цену

## CHOOSE_PICTURE
Выбор картинки. Меняет table.picture, пересчитывает цену

## TOGGLE_PICTURE
Включает/выключает рисунок, пересчитывает цену

## TOGGLE_PICTURE_PICKER_WINDOW
Показывает/скрывает окно выбора рисунка

## CHANGE_QUANTITY
Меняет кол-во столиков, пересчитывает цену

## ADD_TO_CART
Вызывает cart.add из common.js опенкарта
