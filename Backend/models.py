from sqlalchemy import Column, Integer, String
from database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String)
    job_title = Column(String)
    status = Column(String)
    salary = Column(String)
    location = Column(String)
    date_applied = Column(String)
    job_link = Column(String)
    notes = Column(String)

