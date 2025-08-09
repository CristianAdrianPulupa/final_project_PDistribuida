# 1) Base
FROM python:3.11

# 2) Directorio de trabajo
WORKDIR /app

# 3) Copiamos requirements y los instalamos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4) Copiamos el código y el .env
COPY . .

# 5) Exponemos el puerto
EXPOSE 3030

# 6) Arrancamos
CMD ["python", "run.py"]
