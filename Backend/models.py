from sqlalchemy import Column, Date, Integer, String, Boolean
from database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String)
    job_title = Column(String)
    status = Column(String)
    salary = Column(String)
    location = Column(String)
    date_applied = Column(Date, nullable=True)
    interview_date = Column(Date, nullable=True)
    follow_up_date = Column(Date, nullable=True)
    follow_up_completed = Column(Boolean, default=False, nullable=False)
    job_link = Column(String)
    notes = Column(String)

