# Imagen base con Node.js
FROM node:20

# Carpeta de trabajo
WORKDIR /app

# Instala algunas utilidades opcionales (puedes quitarlas si no las necesitas)
RUN apt-get update && apt-get install -y git bash && rm -rf /var/lib/apt/lists/*

# Exponer el puerto del servidor de desarrollo de React
EXPOSE 3000

# Iniciar bash para que puedas ejecutar comandos manualmente
CMD ["bash"]
