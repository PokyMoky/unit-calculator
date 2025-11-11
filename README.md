# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Технологии
- React
- Vite
- Zustand
- Axios
- Express
- Mongoose
- Validator
- xlsx

## Запуск
- команда для параллельного запуска backend и frontend - npm run dev:all

## Переменные окружения
- переменные окружения указаны в файле .env.example
- файл .env не входит в репозиторий

## Краткое описание структуры
- server - директория с backend'ом
- src - директория с frontend'ом:
    - icons - в эту директорию вынесены компоненты с иконками (я их сделала кастомными, т.к. некоторые иконки из lucide не совпадали с дизайном)
    - components - директория с остальными компонентами. В ней:
    - forms - директория, куда вынесены все формы,
    - layout - в этой директории я постаралась скомпоновать компоненты в соответствии с layout'ом
    - util-components - содержит cookie banner, модальное окно и tooltip 

## Вычисления
вычисления производятся в файле /src/utils/calculation.js. К сожалению, я не нашла единых канонических формул
для вычисления всех показателей, поэтому часть результатов не совпадает с указанными в дизайне, но
"мои" формулы можно легко заменить на нужные в данном файле

## Ссылки
Т.к. в ТЗ была только одна страница, я не стала подключать react-router, поэтому ссылки реализованы как anchor, а не Link
