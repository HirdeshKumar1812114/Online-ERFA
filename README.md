# Online-ERFA

## Introduction
The procedure of the entire scholarship process is still following the traditional file system. This can be challenging for both the ERFA (External Relationship & Financial Assistance) department and students as both encounter complex and tedious tasks.

## OBJECTIVE
#### WHAT WE ARE GOING TO DO?
To develop a fully automated PWA (Progressive Web Application) for SZABIST’s ERFA Department in order to cater for the needs of the whole scholarship’s process from announcements to the allotments of scholarships in a centralized manner. Hence, it would gradually save efforts and resources consumed during the student’s scholarship file submission, interview, and grant allotment.

## PROBLEM DESCRIPTION
#### WHAT ARE THE PROPLEMS WITH CURRENT PROCESS?
- The following are problems faced by the staff and students during the scholarship process:
- All students might not be aware of the scholarship available in SZABIST.
- Students have to manually fill a very large form, if there is a mistake on the form then they have to refill a new form.
- The scholarship form and documents verification of each applicant is hectic for the scholarship department, as they need to verify whether the applicant has attached all the required documents or not, which takes an enormous amount of time.
- Applicants are informed about the status of their application through a list posted on social media. Sharing such information on a social media platform is not a proper channel to communicate.
- The data for the number of funds and scholarship grants, allocated for a particular scholarship program, is not readily present in the system. In order to manage and plan resources efficiently, there needs to be a statistical overview of each scholarship program.
- The scheduled interviews are long and cause students to wait up to extra four to five hours for their interview.
- Interview panellists’ evaluation sheets can be displaced and lost as there is a large volume of papers involved.
- The previous year’s scholarship holder’s records review is laborious for the ERFA Department while allocating the scholarship percentage to a specific student.
- If a student is already a scholarship holder, he or she has to follow the entire afresh procedure of re-application which would cause redundancy as some of the documents are already present in the records of the department.

## Group Members
- #### Syed Mustafa Imam 1812134
- #### Hirdesh Kumar 1812114

---

# Deployment

To get started with the project Nodejs version ```v14.17.6``` and above should be installed on the system.  

## Prject Structure

├── admin
         
   └── main <--- Admin Client Side (Reactjs)

├── server  <--- Backend server (Nodejs)

└── student <--- Student Client Side (Reactjs)
   


## Required Tools:
In order to run the project the system needs the following tools.

### Nodemon:
Nodemon has to be installed globally.
```bash
$ npm -i -g nodemon
```
### Yarn:

To Install Yarn:
```bash
$ npm install --global yarn
```
## Running The Project
### Front-End
In the project directory type the following commands in a terminal
to run the Front-End of the Project: 
1. Move to the admin client directory
```bash
$ cd admin/main/
```
2. After this we run the command to install all the dependences for the Front-End:
```bash
$ yarn install
```
3. After this we start Front-End by running the command:
```bash
$ yarn start
```
After running the command the Front-End will be up on Port 3000, Open http://localhost:3000 to view in the browser.

4. Now open a new terminal or console switch to the student client directory
```bash
$ cd student/
```
5. After this we run the command to install all the dependences for the Front-End:
```bash
$ yarn install
```
6. After this we start Front-End by running the command:
```bash
$ yarn start
```
After running the command the Front-End will be up on Port 3000, Open http://localhost:3001 to view in the browser.

### Back-End

In the project directory Run the following commands
to run the Back-End of the Project:
1. Now open a new terminal or console and move to the backend server directory
```bash
$ cd server/
```
1. After this we run the command to install all the dependences for the Back-End:
```bash
$ npm i
```
2. After this we run the command for starting Back-End:
```bash
$ nodemon start
```
After running the command the Front-End will be up on Port 5000.
