# contactcentervc

   
  🚀 Instalación y Configuración
1️⃣ Clonar el repositorio

git clone [https://github.com/tu-usuario/contactcenterapp.git](https://github.com/Bordor123/contactcentervc.git)

cd contactcenterapp
2️⃣ Configurar el Backend (.NET 9.0 y SQLite)
📌 Requisitos previos:

Instalar .NET 9.0 SDK
Instalar SQLite
📌 Ejecutar la API

cd ContactCenter.API
dotnet restore
dotnet run
📌 La API estará corriendo en: http://localhost:5175 (http://localhost:5175/swagger/index.html)

3️⃣ Configurar el Frontend (Next.js con Bootstrap y Axios)
📌 Requisitos previos:

Instalar Node.js 20
📌 Instalar dependencias y correr el frontend:

cd contact-center-app
npm install
npm run dev
📌 El frontend estará disponible en: http://localhost:3000

🛠 Tecnologías Utilizadas
🔹 Backend: .NET 9.0 + SQLite
🔹 Frontend: Next.js + Bootstrap + Axios
🔹 API REST con autenticación y CRUD de agentes
