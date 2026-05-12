import os
from datetime import datetime, timedelta
from typing import Optional

import bcrypt
import jwt
from fastapi import Request, HTTPException
from pydantic import BaseModel

JWT_SECRET = os.getenv("JWT_SECRET", "fallback-dev-secret-change-me")
JWT_ALGORITHM = "HS256"
TOKEN_EXPIRY_DAYS = 7


class SignupRequest(BaseModel):
    email: str
    password: str
    display_name: str
    anonymous_id: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str
    anonymous_id: Optional[str] = None

class AuthResponse(BaseModel):
    token: str
    user_id: int
    email: str
    display_name: str


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt(rounds=12)).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_token(user_id: int, email: str) -> str:
    payload = {
        "sub": str(user_id),
        "email": email,
        "exp": datetime.utcnow() + timedelta(days=TOKEN_EXPIRY_DAYS),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        data["sub"] = int(data["sub"])
        return data
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = auth_header[7:]
    return decode_token(token)
