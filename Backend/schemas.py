from pydantic import BaseModel
from datetime import date

class ApplicationCreate(BaseModel):
    company: str
    job_title: str
    status: str
    salary: str
    location: str
    date_applied: date | None = None
    job_link: str
    notes: str
    interview_date: date | None = None
    follow_up_date: date | None = None
    follow_up_completed: bool = False