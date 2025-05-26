import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuração de CORS para diferentes ambientes
  app.enableCors({
    origin: [
      "http://localhost:3001", // Desenvolvimento local
      "https://sorgrao-frontend.vercel.app", // Preview/Staging na Vercel
      "https://sorgrao.vercel.app", // Produção na Vercel
      "https://app.sorgrao.com", // Domínio personalizado
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
