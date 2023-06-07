import os

import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from bd_my.bd_my.bd_my import bd
from bd_my.configurate.config import PROJECT_NAME, VERSION, ORIGINS, ALLOWED_CREDENTIALS, ALLOWED_METHODS, \
    ALLOWED_HEADERS, OPENAPI_URL
from bd_my.db.connect_db import async_engine, Base

BASEDIR = os.path.abspath(os.path.dirname(__file__))


def get_application() -> FastAPI:
    application = FastAPI(title=PROJECT_NAME, debug=True, version=VERSION, openapi_url=OPENAPI_URL,
                          default_charset="UTF-8")
    application.include_router(bd, prefix=f"/api")
    application.add_middleware(CORSMiddleware,
                               allow_origins=ORIGINS,
                               allow_credentials=ALLOWED_CREDENTIALS,
                               allow_methods=ALLOWED_METHODS,
                               allow_headers=ALLOWED_HEADERS, )

    @application.on_event("startup")
    async def startup():
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    return application


app = get_application()

if __name__ == '__main__':
    uvicorn.run("main:app", port=7999, host='127.0.0.1', log_level="debug")
