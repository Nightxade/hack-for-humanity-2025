FROM python:3.10-alpine

RUN mkdir -p /app/src
WORKDIR /app

ARG src_files="*.py"

COPY src/${src_files} ./src/
COPY ./run.py ./requirements.txt ./
RUN mkdir -p data
COPY ./data ./data/

RUN adduser -D user && \
    chown -R user:user /app
USER user

RUN pip install -r requirements.txt

CMD ["python3", "/app/run.py"]