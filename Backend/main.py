import schemas
import models
from models import Application
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

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
def get_applications(db: Session = Depends(get_db)):
    
    return db.query(Application).all()

# Getting a specific applicaiton
@app.get("/applications/{application_id}")
def get_application(application_id: int,
                    db: Session = Depends(get_db)):

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")

    return application

@app.post("/applications")
def create_application(application: schemas.ApplicationCreate,
                       db: Session = Depends(get_db)):

    new_application = Application(
        company = application.company,
        job_title = application.job_title,
        status = application.status,
        salary = application.salary,
        location = application.location,
        date_applied = application.date_applied,
        job_link = application.job_link,
        notes = application.notes,
        interview_date = application.interview_date,
    )
    
    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application

@app.delete("/applications/{application_id}")
def delete_application(application_id: int,
                       db: Session = Depends(get_db)):

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    db.delete(application)
    db.commit()

    return {"message": "Application deleted successfully"}

@app.put("/applications/{application_id}")
def update_application(
    application_id: int,
    updated_application: schemas.ApplicationCreate,
    db: Session = Depends(get_db)
    ):


    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    application.company = updated_application.company
    application.job_title = updated_application.job_title
    application.status = updated_application.status
    application.salary = updated_application.salary
    application.location = updated_application.location
    application.date_applied = updated_application.date_applied
    application.job_link = updated_application.job_link
    application.notes = updated_application.notes
    application.interview_date = updated_application.interview_date

    db.commit()
    db.refresh(application)

    return application
    

