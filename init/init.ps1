python3 -m venv .venv
Set-ExecutionPolicy Unrestricted -Scope Process
npm ci
.\.venv\Scripts\activate
pip install -r .\requirements.txt