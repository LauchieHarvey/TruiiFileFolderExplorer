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

... time elapses ...

I have got all of the containers I need. Now I need to get them communicating with eachother.

I need to streamline the production build process so it's easy for you to setup. 

I am still debating whether I made the right call to have the React code in a separate container to the ASP.NET server. It makes the production workflow a bit tricky since the ASP.NET server needs the output from the frontend build process. I think it's at a decent place now though, so I'll be focusing on the development environment until I get a near-complete project.

I'm quite familiar with docker and docker-compose, but it's the first time I've created a docker-compose.yml file from scratch by myself. It is a good learning experience. I'm also seizing the opportunity to experiment with [Bun](https://bun.sh).

... time elapses ...

I am starting to plan and implement the database.  
I was mentally preparing for a more difficult schema but after reading the specification more carefully it seems relatively straightforward.  
I believe it can be done with just two simple tables. One for folders and one for files. I'm contemplating normalising this schema to include the concept of a heirarchical node. At the moment I believe that would add more complexity than necessary without much benefit.   
I would expect that a file storage cloud service like AWS's S3 buckets would be better suited to file storage than PostgreSQL. If I were building this for commercial purposes I'd read more about that option before diving into Postgres file storage.

Inside the docker-compose.yml file I've added adminer so that I can graphically inspect the datbase to ensure I'm setting it up properly. This will also help me with debugging and manual testing.

... time elapses ...

While I have 3 days remaining in the project I will be working on all of them so I don't have much actual time left.  
Good thing it's almost done. The main feature left to implement is file uploading. The DB is set up for it. I just need to implement the ASP.NET API to support it & hook that up to React. I'm sure the React part of that will be easy. I'm less sure about the ASP.NET part.  

I've been enjoying using TailwindCSS and Bun so far. I think I'll be incoorporating both of those in my personal projects going forward.

Additionally I will need to make the User Guide. I'm hoping that my Docker setup will make that fairly straightforward.

... time elapses ...

File uploads now work! That's all of the essential features done :)

I'm considering adding leaflet to visualise the geojson.

... time elapses ...

I've implemented file "preview" for both csv and geojson. I'm wondering if I've misinterpreted the definition of preview though...  
The previews I've made only show after you've uploaded the file and click on it in the folder view. It was probably intended to be a pre-upload sanity check for the file content. 

## Database Schema

Folders: *id*, name, parentId  
Files: *id*, name, parentId, file

If you'd like to inspect the DB when the containers are running, visit [adminer](http://localhost:8001/?pgsql=db&username=truii&db=tfedb) and use password "truii".

## User Guide

WARNING: The UI won't work yet, I am yet to add and push the frontend dist/ directory. I wouldn't normally do this but it'll save you a complicated dev environment set up.

I have containerized this project using docker. The steps to get the project running are as follows:  
1. Make sure docker is installed.
2. git clone git@github.com:LauchieHarvey/TruiiFileFolderExplorer.git
3. From the project root directory run: docker compose build
4. docker compose up -d
5. Wait ~5 seconds and then open the UI on http://localhost

### System Limitations
Maximum filesize is 100MB. I have not tested with a file that large. I don't expect it to work since the file content is loaded all at once in the browser for the preview features. Uploading it to the DB should work but I'd be surprised if the browser doesn't crash when previewing a 100MB file.  
I have tested with all of the files provided with the project specification.  

## Future Development Plans

First step would be to improve the developer environment. Making changes takes too long but with the project only lasting one week it wasn't worth fixing.  
A lot of basic CRUD actions are missing on both files and folders. That is a definite area for improvement.

