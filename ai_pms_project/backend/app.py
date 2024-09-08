from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

def generate_llm_response(prompt: str, is_private: bool) -> str:
    # Simulating LLM response generation
    if is_private:
        return f"Private response for: {prompt}"
    else:
        return f"Public response for: {prompt}"

# New GET routes for testing
@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI LLM-like backend!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/info")
async def info():
    return {
        "app_name": "FastAPI LLM-like Backend",
        "version": "1.0.0",
        "available_routes": [
            "/developer", "/tester", "/pm", "/techlead",
            "/insights", "/search", "/db"
        ]
    }

# Existing POST routes
@app.post("/developer")
async def developer_route(request: PromptRequest, private_data: Optional[bool] = Query(False)):
    response = generate_llm_response(request.prompt, private_data)
    return {"role": "Developer", "response": response}

@app.post("/tester")
async def tester_route(request: PromptRequest, private_data: Optional[bool] = Query(False)):
    response = generate_llm_response(request.prompt, private_data)
    return {"role": "Tester", "response": response}

@app.post("/pm")
async def pm_route(request: PromptRequest, private_data: Optional[bool] = Query(False)):
    response = generate_llm_response(request.prompt, private_data)
    return {"role": "Project Manager", "response": response}

@app.post("/techlead")
async def techlead_route(request: PromptRequest, private_data: Optional[bool] = Query(False)):
    response = generate_llm_response(request.prompt, private_data)
    return {"role": "Tech Lead", "response": response}

@app.post("/insights")
async def insights_route(request: PromptRequest, private_data: Optional[bool] = Query(False)):
    response = generate_llm_response(request.prompt, private_data)
    return {"role": "Insights", "response": response}

@app.post("/search")
async def search_route(request: PromptRequest, private_data: Optional[bool] = Query(False)):
    response = generate_llm_response(request.prompt, private_data)
    return {"role": "Search", "response": response}

@app.post("/db")
async def db_route(request: PromptRequest, private_data: Optional[bool] = Query(False)):
    response = generate_llm_response(request.prompt, private_data)
    return {"role": "Database", "response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)