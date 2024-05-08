# Truii File Folder Explorer

## Development Notes
### My real, chronological thought process during development.

My first challenge is splitting up the problem into smaller ones.

I think it makes sense to split up the major technical areas.
- Frontend (React)
- Backend (ASP.NET Core)
- Database (PostgreSQL)

I can develop the React App in isolation if I create fake data for it to read. 
With that said I do not want to be in place where I build false assumptions about the API into the UI.
With limited experience in ASP I want to get to a Proof of Concept (PoC) stage as early as possible. i.e. I want all the key components talking to eachother as soon as possible.

PoC Requirements (Self-imposed):
- Create a Docker container for the Web App and the Database.
- Host the React app through ASP.NET.
- Get a browser page rendering with a number from the database on it.
- Aim for this to be done by 12pm Friday (10/05/24).

Once the PoC is done I can be confident in my DB and React experience to finish the rest of the project.

## User Guide

### System Limitations
