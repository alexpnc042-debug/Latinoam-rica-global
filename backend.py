# backend.py
# Archivo demostrativo - No funcional en GitHub Pages
# Este archivo es solo un ejemplo de estructura backend con Flask

from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "Backend example - Latinoamericana Global"


@app.route("/api/contacto", methods=["POST"])
def contacto():
    return {"status": "ok", "message": "Mensaje recibido correctamente"}


if __name__ == "__main__":
    app.run(debug=True)
