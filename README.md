# GoIT Group Project - Team 3

## Запуск

1. Встановіть залежності:
   ```bash
   npm i
   npm run start

## Typography

Всі конкретні значення розміру зазначаються в `rem`. [Детальніше тут](https://developer.mozilla.org/en-US/docs/Web/CSS/length)

[Чому саме rem?](https://austingil.com/px-or-rem-in-css/)

Приклад:

```css
html {
  font-size: 16px;
}

.btn {
  border-radius: 0.75rem; /* border-radius: 12px */
  padding: 1rem; /* padding: 16px */
}

.title {
  font-size: 2.25rem; /* font-size: 36px*/
}
```

## Icons

Всі іконки внесено в один спрайт, при використанні можна використовувати `color`, це автоматично буде застосовано для `fill` та `stroke` всередині іконки відповідно до потреби.
