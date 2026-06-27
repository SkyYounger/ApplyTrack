import schemas
import models
from models import Application
from database import engine
from fastapi import FastAPI, HTTPException
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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

    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")

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

@app.delete("/applications/{application_id}")
def delete_application(application_id: int):
    db = SessionLocal()

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if application is None:
        db.close()
        raise HTTPException(status_code=404, detail="Application not found")
    
    db.delete(application)
    db.commit()
    db.close()

    return {"message": "Application deleted successfully"}

@app.put("/applicatons")
def update_application(
    application_id: int,
    updated_application: schemas.ApplicationCreate
    ):

    db = SessionLocal()

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if application is None:
        db.close()
        raise HTTPException(status_code=404, detail="Application not found")
    
    application.company = updated_application.company
    application.job_title = updated_application.job_title
    application.status = updated_application.status
    application.salary = updated_application.salary
    application.location = updated_application.location
    application.date_applied = updated_application.date_applied
    application.job_link = updated_application.job_link
    application.notes = updated_application.notes

    db.commit()
    db.refresh(application)
    db.close()

    return application
    

