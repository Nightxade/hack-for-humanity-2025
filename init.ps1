python -m venv .venv
npm ci
Set-ExecutionPolicy Unrestricted -Scope Process
.\.venv\Scripts\activate
pip install -r .\requirements.txt