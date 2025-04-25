# Используем официальный Node.js образ
FROM node:18-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Компилируем TypeScript
RUN npm run build

# Копируем файл .env
COPY .env .env

# Открываем порт для API
EXPOSE 4000

# Команда запуска приложения
CMD ["npm", "start"]