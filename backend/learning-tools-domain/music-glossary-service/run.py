import os
from dotenv import load_dotenv
from app import create_app

# 1. Carga variables de entorno desde .env
load_dotenv()

# 2. Crea la aplicación
app = create_app()

# 3. Arranca el servidor
if __name__ == "__main__":
    # Puedes parametrizar el puerto también vía .env (p. ej. PORT=3030)
    port = int(os.getenv("PORT", 3030))
    app.run(host="0.0.0.0", port=port)
