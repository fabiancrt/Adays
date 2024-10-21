
FROM node:18

RUN apt-get update && apt-get install -y default-mysql-client

WORKDIR /app

COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY prisma ./prisma

RUN pnpm prisma generate --schema=./prisma/schema.prisma

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "/app/wait-for-it.sh db:3306 --timeout=120 -- sh -c 'until mysql -h db -u root -pF@bian20MYSQL --execute=\"SELECT 1\"; do echo \"Waiting for MySQL...\"; sleep 5; done && pnpm prisma migrate deploy --schema=./prisma/schema.prisma && pnpm run dev'"]