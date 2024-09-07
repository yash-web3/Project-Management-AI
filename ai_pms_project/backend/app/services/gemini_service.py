import google.generativeai as genai

class GeminiService:
    def __init__(self):
        genai.configure(api_key="YOUR_GEMINI_API_KEY")
        self.model = genai.GenerativeModel('gemini-pro')

    def analyze_project(self, project_data):
        prompt = f"Analyze the following project data and provide insights: {project_data}"
        response = self.model.generate_content(prompt)
        return response.text