from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"project": "MyEvents API", "status": "running"}