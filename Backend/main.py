import schemas
import models
from models import Application
from database import engine
from fastapi import FastAPI
from database import SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/applications")
def get_applications():
    db = SessionLocal()

    applications = db.query(Application).all()

    db.close()
    
    return applications

# Getting a specific applicaiton
@app.get("/applications/{application_id}")
def get_application(application_id: int):
    db = SessionLocal()

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    db.close()

    return application

@app.post("/applications")
def create_application(application: schemas.ApplicationCreate):
    db = SessionLocal()

    new_application = Application(
        company = application.company,
        job_title = application.job_title,
        status = application.status,
        salary = application.salary,
        location = application.location,
        date_applied = application.date_applied,
        job_link = application.job_link,
        notes = application.notes
    )
    
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    db.close()

    return new_application

