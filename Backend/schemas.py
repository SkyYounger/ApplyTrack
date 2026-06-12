from pydantic import BaseModel

class ApplicationCreate(BaseModel):
    company: str
    job_title: str
    status: str
    salary: str
    location: str
    date_applied: str
    job_link: str
    notes: str