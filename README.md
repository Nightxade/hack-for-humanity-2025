# Repo for Hack for Humanity 2025 project
Daily, breaking news on humanitarian issues across Earth.

## Team
Matthew Cai, Ava Rouzmehr, Lawrence Wang, Yuexiang Wu, Kaelan Yim

## Commands
### Initialize Repository
```bash
chmod +x ./init/init.sh
./init/init.sh
```

### Build Deployment
```bash
make
```

### Terminate Deployment
```bash
make clean
```

## Technical Features
- Persistent sqlite3 database that lasts across builds and only updates on demand  
- Fast, lightweight build tools structured for easy, extensible development  
- LLM-powered event categorization and article summaries  
- Interactive map with dynamic icon resizing and filtering options  

## Frameworks/Tools
### Backend
- OpenAI
- Flask
- SQLAlchemy

### Frontend
- Node
- Express

### Deployment
- Docker
- GNU Make

## Languages
- HTML/CSS
- JavaScript
- Python